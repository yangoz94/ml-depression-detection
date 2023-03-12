package com.depressiondetection.springbootbackend.Depression;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface DepressionRepository extends JpaRepository<Depression, Long> {
}
