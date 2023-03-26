package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class DepressionController {
    private final DepressionService depressionService;

    @Autowired
    public DepressionController(DepressionService depressionService) {
        this.depressionService = depressionService;
    }

    @PostMapping("/processInput/")
    public ResponseEntity<String> addInput(@RequestBody Depression depression) throws ExecutionException, InterruptedException {
        String output = depressionService.processInput(depression);
        String statementJSON = depressionService.createStatementJSON(output);
        return ResponseEntity.ok().body(statementJSON);
    }
    // to view all the data in the database for fun - can be publicly accessed through the URL
    @GetMapping("/depression/")
    public List<Depression> viewDepressionData() {
        return depressionService.viewDepressionData();
    }
}
