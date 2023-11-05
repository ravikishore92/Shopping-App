package com.shopping.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.entity.Product;
import com.shopping.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductRepository productRepo;
	
	@PostMapping("")
	public ResponseEntity<?> addProduct(@RequestBody Product product){
		productRepo.save(product);
		
		return ResponseEntity.ok().body("Product added successfully");
	}
	
	
	@GetMapping("")
	public ResponseEntity<List<Product>> getProducts(@RequestParam(name = "size",defaultValue="5") int size,@RequestParam(name = "page",defaultValue="0") int page){
		return ResponseEntity.ok().body(productRepo.findAll(PageRequest.of(page, size)).getContent());
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Product>> seachProducts(@RequestParam("query") String query){
		List<Product> products = productRepo.findByNameContainingIgnoreCase(query);
		return ResponseEntity.ok().body(products);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getProducts(@PathVariable("id") Long id){
		
		Optional<Product> product = productRepo.findById(id);
		if(!product.isPresent()) {
			throw new RuntimeException("Product not found");
		}
		return ResponseEntity.ok().body(product.get());
	}
	
	
	
	
}
