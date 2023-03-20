package com.depressiondetection.springbootbackend.Depression;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface DepressionRepository extends JpaRepository<Depression, Long> {

    Optional<Depression> findByInput(String input);
}

