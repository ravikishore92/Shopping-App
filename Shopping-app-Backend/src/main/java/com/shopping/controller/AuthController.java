package com.shopping.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.exception.InvalidPasswordException;
import com.shopping.exception.UserNotFoundException;
import com.shopping.model.LoginCredentials;
import com.shopping.service.AuthService;

@RestController
public class AuthController {
	
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("customers/login")
	public ResponseEntity<String> userLogin(@RequestBody LoginCredentials credentials)
	{
		 String token = this.authService.userLogin(credentials);
		 return ResponseEntity.accepted().body(token);
	}
	@PostMapping("admins/login")
	public ResponseEntity<String> adminLogin(@RequestBody LoginCredentials credentials)
	{
		 String token = this.authService.adminLogin(credentials);
		 return ResponseEntity.accepted().body(token);
	}
	
	
	
}
