package com.depressiondetection.springbootbackend.Depression;
import jakarta.persistence.*;

@Entity
@Table
public class Depression {
    @Id
    @SequenceGenerator(
            name = "depression_sequence",
            sequenceName = "depression_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "depression_sequence"
    )
    private Long id;
    private String input;
    private String output = ""; //we will update the value after processing the input through AWS lambda

    public Depression (String input, String output) {
        this.input = input;
        this.output = output;
    }

    public Depression() {
    }

    public String getInput() {
        return this.input;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getOutput() {
        return this.output;
    }
} 
   


