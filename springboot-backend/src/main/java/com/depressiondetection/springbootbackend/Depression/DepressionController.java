package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class DepressionController {
    private final DepressionService depressionService;

    @Autowired
    public DepressionController(DepressionService depressionService) {
        this.depressionService = depressionService;
    }

    @PostMapping("/addInput")
    public void addInput(@RequestBody Depression input) {
        depressionService.addInput(input);
    }

    @GetMapping("/depression")
    public List<Depression> viewDepressionData() {
        return depressionService.viewDepressionData();
    }
}
