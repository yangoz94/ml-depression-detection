package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin
public class DepressionController {
    private final DepressionService depressionService;

    @Autowired
    public DepressionController(DepressionService depressionService) {
        this.depressionService = depressionService;
    }

    @PostMapping("/processInput")
    public ResponseEntity<String> addInput(@RequestBody Depression depression) {
        String output = depressionService.processInput(depression);
        return ResponseEntity.ok().body(output);
    }


    @GetMapping("/depression")
    public List<Depression> viewDepressionData() {
        return depressionService.viewDepressionData();
    }
}
