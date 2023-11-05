package com.shopping.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.shopping.exception.InvalidPasswordException;
import com.shopping.exception.UserNotFoundException;
import com.shopping.exception.UsernameAlreadyExistsException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	
	
	@ExceptionHandler(UsernameAlreadyExistsException.class)
	public ResponseEntity<String> handle(UsernameAlreadyExistsException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handle(UserNotFoundException e){
		
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
	@ExceptionHandler(InvalidPasswordException.class)
	public ResponseEntity<String> handle(InvalidPasswordException e){
		
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> handle(RuntimeException e){
		
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
}
