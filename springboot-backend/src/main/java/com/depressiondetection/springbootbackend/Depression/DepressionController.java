package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.concurrent.ExecutionException;


@RestController
@CrossOrigin
public class DepressionController {
    private final DepressionService depressionService;

    @Autowired
    public DepressionController(DepressionService depressionService) {
        this.depressionService = depressionService;
    }

    @PostMapping("/processInput")
    public ResponseEntity<String> addInput(@RequestBody Depression depression) throws ExecutionException, InterruptedException {
        String output = depressionService.processInput(depression);
        String statementJSON = depressionService.createStatementJSON(output);
        return ResponseEntity.ok().body(statementJSON);
    }

    @GetMapping("/depression")
    public List<Depression> viewDepressionData() {
        return depressionService.viewDepressionData();
    }
}
