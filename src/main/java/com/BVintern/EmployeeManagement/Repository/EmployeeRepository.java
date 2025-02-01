package com.BVintern.EmployeeManagement.Repository;

import com.BVintern.EmployeeManagement.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Integer> {
    // Example of a custom query method
    List<Employee> findByLastName(String lastName);
}
