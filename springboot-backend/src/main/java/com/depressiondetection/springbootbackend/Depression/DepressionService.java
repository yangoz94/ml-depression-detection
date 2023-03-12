package com.depressiondetection.springbootbackend.Depression;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepressionService {
    private final DepressionRepository depressionRepository;

    @Autowired
    public DepressionService(DepressionRepository depressionRepository) {
        this.depressionRepository = depressionRepository;
    }

    public List<Depression> viewDepressionData() {
        return depressionRepository.findAll();
    }

    public void addInput(Depression input) {
        // Logic to process the input and write the input and output to the database will be added here
        depressionRepository.save(input);
    }

}
