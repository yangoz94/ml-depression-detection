package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void addInput(@RequestBody Depression depression) {
        depressionService.processInput(depression);
    }

    @GetMapping("/depression")
    public List<Depression> viewDepressionData() {
        return depressionService.viewDepressionData();
    }
}
