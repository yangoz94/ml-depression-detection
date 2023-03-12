package com.depressiondetection.springbootbackend.Depression;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface DepressionRepository extends JpaRepository<Depression, Long> {
}

