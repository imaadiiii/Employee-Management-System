package com.BVintern.EmployeeManagement.controller;

import com.BVintern.EmployeeManagement.entity.User;
import com.BVintern.EmployeeManagement.Repository.UserRepository;
import com.BVintern.EmployeeManagement.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    // 1) REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if username already exists
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        // Hash the password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());

        // Default role = USER
        String roleToSet = user.getRole() == null ? "USER" : user.getRole().toUpperCase();
        user.setRole(roleToSet);
        user.setPassword(hashedPassword);

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // 2) LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        User foundUser = existing.get();

        // Compare passwords
        boolean passwordsMatch = BCrypt.checkpw(user.getPassword(), foundUser.getPassword());
        if (!passwordsMatch) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        // Generate JWT Token
        String token = jwtService.generateToken(foundUser.getUsername());
        return ResponseEntity.ok(token);
    }
}
