package com.shopping.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.entity.Admin;
import com.shopping.exception.UsernameAlreadyExistsException;
import com.shopping.repository.AdminRepository;

@RestController 
@RequestMapping("/admins")
public class AdminController {
	
	
	@Autowired
	private AdminRepository adminRepo;
	
	@PostMapping("")
	public ResponseEntity<String> addAdmin(@RequestBody Admin admin){
		
		Optional<Admin> a = this.adminRepo.findByUsername(admin.getUsername());
		
		if(a.isPresent()) 
			throw new UsernameAlreadyExistsException("Username already exists, try another one");
		
		this.adminRepo.save(admin);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("Admin created successfully");
		
	}

}
