package com.depressiondetection.springbootbackend.Depression;

import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvocationType;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.amazonaws.services.lambda.model.LogType;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class DepressionService {

    private final DepressionRepository depressionRepository;
    private static final String AWS_LAMBDA_FUNCTION_NAME = System.getenv("AWS_LAMBDA_FUNCTION_NAME");
    private static final String AWS_LAMBDA_FUNCTION_REGION = System.getenv("AWS_LAMBDA_FUNCTION_REGION");

    @Autowired
    public DepressionService(DepressionRepository depressionRepository) {
        this.depressionRepository = depressionRepository;
    }

    public List<Depression> viewDepressionData() {
        return depressionRepository.findAll();
    }

    public String processInput(Depression depression) {
        String input = depression.getInput();
        JSONObject payload = createPayload(input);
        String output = invokeLambda(payload);
        String depressionOutput = getDepressionOutput(output);
        depression.setOutput(depressionOutput);
        depressionRepository.save(depression);
        return depressionOutput;
    }

    private JSONObject createPayload(String input) {
        JSONObject payload = new JSONObject();
        payload.put("input", input);
        payload.put("Content-Type", "application/json");
        return payload;
    }

    private String invokeLambda(JSONObject payload) {
        AWSLambda lambda = createLambdaClient();
        InvokeRequest invokeRequest = createInvokeRequest(payload);
        InvokeResult invokeResult = lambda.invoke(invokeRequest);
        return parsePayload(invokeResult.getPayload());
    }

    private AWSLambda createLambdaClient() {
        return AWSLambdaClientBuilder.standard().withRegion(AWS_LAMBDA_FUNCTION_REGION).build();
    }

    private InvokeRequest createInvokeRequest(JSONObject payload) {
        InvokeRequest invokeRequest = new InvokeRequest();
        invokeRequest.setFunctionName(AWS_LAMBDA_FUNCTION_NAME);
        invokeRequest.setPayload(payload.toString());
        invokeRequest.withInvocationType(InvocationType.RequestResponse);
        invokeRequest.withLogType(LogType.Tail);
        return invokeRequest;
    }

    private String parsePayload(ByteBuffer payload) {
        return new String(payload.array(), StandardCharsets.UTF_8);
    }


    private String getDepressionOutput(String output) {
        JSONObject jsonOutput = new JSONObject(output);
        return jsonOutput.getString("output");
    }
}
