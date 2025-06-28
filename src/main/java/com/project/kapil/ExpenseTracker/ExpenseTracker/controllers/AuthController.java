package com.project.kapil.ExpenseTracker.ExpenseTracker.controllers;


import com.project.kapil.ExpenseTracker.ExpenseTracker.dto.LoginDto;
import com.project.kapil.ExpenseTracker.ExpenseTracker.dto.SignUpDto;
import com.project.kapil.ExpenseTracker.ExpenseTracker.dto.UserDto;
import com.project.kapil.ExpenseTracker.ExpenseTracker.services.AuthService;
import com.project.kapil.ExpenseTracker.ExpenseTracker.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> signUp(@RequestBody SignUpDto signUpDto) {
        UserDto userDto = userService.signUp(signUpDto);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto loginDto) {
        Map<String, String> response = authService.login(loginDto);
        return ResponseEntity.ok(response);
    }

}
