package com.depressiondetection.springbootbackend.Depression;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvocationType;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.amazonaws.services.lambda.model.LogType;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class DepressionService {
    private final DepressionRepository depressionRepository;
    private static final String AWS_LAMBDA_FUNCTION_NAME = System.getenv("AWS_LAMBDA_FUNCTION_NAME");
    private static final String AWS_LAMBDA_FUNCTION_REGION = System.getenv("AWS_LAMBDA_FUNCTION_REGION");

//    private static final AWSLambda lambda = AWSLambdaClientBuilder.standard().withRegion(AWS_LAMBDA_FUNCTION_REGION).build();
    private static final AWSCredentials awsCredentials = new BasicAWSCredentials(
        System.getenv("AWS_ACCESS_KEY_ID"),
        System.getenv("AWS_SECRET_ACCESS_KEY")
    );
    private static final AWSLambda lambda = AWSLambdaClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
            .withRegion(AWS_LAMBDA_FUNCTION_REGION)
            .build();


    @Autowired
    public DepressionService(DepressionRepository depressionRepository) {
        this.depressionRepository = depressionRepository;
    }

    public List<Depression> viewDepressionData() {
        /* This method returns all the depression objects in the database */
        return depressionRepository.findAll();
    }

    public String processInput(Depression depression) throws ExecutionException, InterruptedException {
        /*
        This method checks if the input already exists in the database. If it does, it returns the output value from the database.
        If it doesn't, it processes user input and updates the depression object with the appropriate output.
        It then saves the depression object to the database. Returns the output value.
         */
        System.out.println("ProcessInput request has just been received");
        String input = depression.getInput();
        System.out.println("depression input received: " + input);
        if (checkIfInputExistsInDB(input)) {
            return depressionRepository.findByInput(input).get().getOutput();
        }
        System.out.println("depression input was searched in the database and not found. Continue to process...");
        JSONObject payload = createPayload(input);
        System.out.println("Json object payload created... Moving to invoking lambda method.");
        String output = invokeLambda(payload);
        System.out.println("Lambda invoked and output was received.");
        CompletableFuture<String> outputFuture = getDepressionOutput(output);
        String depressionOutput = outputFuture.get();
        System.out.println("depression output received: " + depressionOutput);
        depression.setOutput(depressionOutput);
        System.out.println("depression output was set to the depression object.");
        depressionRepository.save(depression);
        System.out.println("depression output is being returned to the controller. END");
        return depressionOutput;
    }

    public String createStatementJSON(String output) {
        /*
        This method creates a JSON object that contains a statement that will be sent and displayed to the user on browser.
        However, the statement value will not be written to the database. Only numeric output value will be written to the database.
        */
        String statement = switch (output) {
            case "0" -> "YAY! You don't seem to be showing any signs of depression! Keep it up!";
            case "1" -> "You show some signs of depression. Please consider seeing a therapist!";
            default -> "Sorry, something went terribly wrong. Please try again...";
        };
        JSONObject statementJSON = new JSONObject().put("statement", statement);
        return statementJSON.toString();
    }

    private JSONObject createPayload(String input) {
        /*
        This method creates a JSON object that contains the user input.
        The JSON object will be sent to the AWS lambda function.
         */
        JSONObject payload = new JSONObject();
        payload.put("input", input);
        payload.put("Content-Type", "application/json");
        payload.put("Accept", "application/json");
        payload.put("Access-Control-Allow-Origin", "*");
        payload.put("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        payload.put("Access-Control-Allow-Headers", "*");
        System.out.println("Json object payload created: " + payload.toString());
        return payload;
    }

    private String invokeLambda(JSONObject payload) {
        /* This method invokes the AWS lambda function and returns the output. */
        InvokeRequest invokeRequest = createInvokeRequest(payload);
        InvokeResult invokeResult = lambda.invoke(invokeRequest);

        return parsePayload(invokeResult.getPayload());
    }

    private InvokeRequest createInvokeRequest(JSONObject payload) {
        /* This method creates an AWS lambda invoke request. */
        InvokeRequest invokeRequest = new InvokeRequest();
        invokeRequest.setFunctionName(AWS_LAMBDA_FUNCTION_NAME);

        invokeRequest.setPayload(payload.toString());
        invokeRequest.withInvocationType(InvocationType.RequestResponse);
        invokeRequest.withLogType(LogType.Tail);
        return invokeRequest;
    }

    private String parsePayload(ByteBuffer payload) {
        /* This method parses the payload returned by the AWS lambda function. */
        return new String(payload.array(), StandardCharsets.UTF_8);
    }

    private CompletableFuture<String> getDepressionOutput(String output) {
        /* This method gets the depression output from the JSON object returned by the AWS lambda function. */
        CompletableFuture<String> future = new CompletableFuture<>();
        try {
            JSONObject jsonOutput = new JSONObject(output);
            if (jsonOutput.has("output")) {
                String depressionOutput = jsonOutput.getString("output");
                future.complete(depressionOutput);
            } else {
                future.completeExceptionally(new JSONException("JSON object does not have an 'output' field"));
            }
        } catch (JSONException e) {
            future.completeExceptionally(e);
        }
        return future;
    }

    private boolean checkIfInputExistsInDB(String input) {
        /* This method checks if the user input already exists in the database. */
        Optional<Depression> depressionOptional = depressionRepository.findByInput(input);
        return depressionOptional.isPresent();
    }
}
