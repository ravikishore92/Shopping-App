package com.shopping.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopping.entity.Admin;
import com.shopping.entity.Customer;
import com.shopping.exception.InvalidPasswordException;
import com.shopping.exception.UserNotFoundException;
import com.shopping.model.LoginCredentials;
import com.shopping.repository.AdminRepository;
import com.shopping.repository.CustomerRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthService {

	@Autowired
	private AdminRepository adminRepo;
	
	private final String SECRET_KEY = "ramkumar";

	@Autowired
	private CustomerRepository customerRepo;

	public String userLogin(LoginCredentials credentials) {

		Optional<Customer> c = this.customerRepo.findByUsername(credentials.getUsername());

		Customer customer = c.orElseThrow(() -> new UserNotFoundException("Username not found"));

		if (!customer.getPassword().equals(credentials.getPassword())) {
			throw new InvalidPasswordException("Password is incorrect");
		}
		return createJwt(credentials, "USER");

	}

	private String createJwt(LoginCredentials credentials, String role) {

		return Jwts.builder().claim("username", credentials.getUsername()).claim("role", role)
				.setExpiration(new Date(System.currentTimeMillis() + 5*60*1000))
				.signWith(SignatureAlgorithm.HS256,SECRET_KEY.getBytes()).compact();
	}

	public String adminLogin(LoginCredentials credentials) {
		Optional<Admin> a = this.adminRepo.findByUsername(credentials.getUsername());

		Admin admin = a.orElseThrow(()-> new UserNotFoundException("Username not found"));

		if (!admin.getPassword().equals(credentials.getPassword())) {
			throw new InvalidPasswordException("Password is incorrect");
		}
		return createJwt(credentials, "ADMIN");
	}
}
