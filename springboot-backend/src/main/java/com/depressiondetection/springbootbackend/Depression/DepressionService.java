package com.depressiondetection.springbootbackend.Depression;

import com.amazonaws.services.lambda.model.LogType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.model.InvocationType;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;

@Service
public class DepressionService {
    private final DepressionRepository depressionRepository;
    private static final String AWS_LAMBDA_FUNCTION_NAME = System.getenv("AWS_LAMBDA_FUNCTION_NAME");

    @Autowired
    public DepressionService(DepressionRepository depressionRepository) {
        this.depressionRepository = depressionRepository;
    }

    public List<Depression> viewDepressionData() {
        return depressionRepository.findAll();
    }

    public void processInput(Depression depression) {
        JSONObject payload = new JSONObject();
        payload.put("input", depression.getInput());
        payload.put("Content-Type", "application/json");
        AWSLambda lambda = AWSLambdaClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        InvokeRequest invokeRequest = new InvokeRequest();
        invokeRequest.setFunctionName(AWS_LAMBDA_FUNCTION_NAME);
        invokeRequest.setPayload(String.valueOf(payload));
        invokeRequest.withInvocationType(InvocationType.RequestResponse);
        invokeRequest.withLogType(LogType.Tail);
        InvokeResult invokeResult = lambda.invoke(invokeRequest);
        String lambda_output = new String(invokeResult.getPayload().array(), StandardCharsets.UTF_8);
        JSONObject json_output = new JSONObject(lambda_output);
        String output = json_output.getString("output");
        String logResult = new String(Base64.getDecoder().decode(invokeResult.getLogResult()), StandardCharsets.UTF_8);
        System.out.println("Log Result: " + logResult);
        depression.setOutput(output);
        System.out.println("Depression object  output is " + depression.getOutput());
        depressionRepository.save(depression);
    }
}
