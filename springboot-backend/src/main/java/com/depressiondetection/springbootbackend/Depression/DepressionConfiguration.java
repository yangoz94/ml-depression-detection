package com.depressiondetection.springbootbackend.Depression;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DepressionConfiguration {

    @Bean
    CommandLineRunner commandLineRunner(DepressionRepository repository) {
        return args -> {
            Depression depression = new Depression(
                    "I am sad",
                    " "
            );
            Depression depression2 = new Depression(
                    "i am happy",
                    ""
            );

            repository.saveAll(
                    List.of(depression, depression2)
            );
        };
    }


}
