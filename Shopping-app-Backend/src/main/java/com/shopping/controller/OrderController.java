package com.shopping.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.entity.Orders;
import com.shopping.repository.OrderRepository;


@RestController
@RequestMapping("/orders")
public class OrderController {

	
	@Autowired
	private OrderRepository orderRepo;
	
	@PostMapping("")
	public ResponseEntity<?> addOrder(@RequestBody Orders order){
		orderRepo.save(order);
		return ResponseEntity.ok().body("order added successfully");
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAllOrders(){
		return ResponseEntity.ok().body(orderRepo.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getOrder(@PathVariable("id") Long id){
		Optional<Orders> order = orderRepo.findById(id);
		
		if(!order.isPresent()) {
			throw new RuntimeException("Order not found");
		}
		
		return ResponseEntity.ok().body(order.get());
	}
	
}
