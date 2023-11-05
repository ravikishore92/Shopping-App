package com.shopping.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopping.entity.CartItem;
import com.shopping.entity.Customer;
import com.shopping.entity.Orders;
import com.shopping.entity.Product;
import com.shopping.exception.ProductNotFoundException;
import com.shopping.exception.UserNotFoundException;
import com.shopping.exception.UsernameAlreadyExistsException;
import com.shopping.repository.CartItemRepository;
import com.shopping.repository.CustomerRepository;
import com.shopping.repository.OrderRepository;
import com.shopping.repository.ProductRepository;

@RestController
@RequestMapping("/customers")
public class CustomerController {

	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private CartItemRepository cartRepo;
	
	@PostMapping("")
	public ResponseEntity<?> addCustomer(@RequestBody Customer customer){
		Optional<Customer> c = customerRepo.findByUsername(customer.getUsername());
		if(c.isPresent())
			throw new UsernameAlreadyExistsException("Username already exists, try another username");
		customerRepo.save(customer);
		return ResponseEntity.ok().body("Customer added successfully");
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAllCustomers(){
		return ResponseEntity.ok().body(customerRepo.findAll());
	}
	
	@GetMapping("/{username}")
	public ResponseEntity<?> getCustomer(@PathVariable("username") String username){
		Optional<Customer> customer = customerRepo.findByUsername(username);
		
		if(!customer.isPresent()) {
			throw new UserNotFoundException("Customer not found");
		}
		customer.get().setPassword("");
		return ResponseEntity.ok().body(customer.get());
	}
	
	
	@GetMapping("/orders/{username}")
	public ResponseEntity<List<Orders>> getOrders(@PathVariable("username") String username){
			
		Optional<Customer> c = this.customerRepo.findByUsername(username);
		if(!c.isPresent())
			throw new UserNotFoundException("User not found");
		
		return ResponseEntity.ok().body(c.get().getOrders());
	}
	
	
//	@GetMapping("/{username}/cart/{productId}")
//	public ResponseEntity<String> addProductToCart(@PathVariable("username") String username, @PathVariable("productId")Long productId){
//		
//		Optional<Customer> c = this.customerRepo.findByUsername(username);
//		Optional<Product> p = this.productRepo.findById(productId);
//		if(!c.isPresent())
//			throw new UserNotFoundException("User not found");
//		if(!p.isPresent())
//			throw new ProductNotFoundException("Product not found");
//		String cartItems = c.get().getCartItems();
//		cartItems = cartItems + "," + String.valueOf(productId);
//		c.get().setCartItems(cartItems);
//		this.customerRepo.save(c.get());
//		return ResponseEntity.accepted().body("Product added to cart successfully");
//	}
	
	@GetMapping("/{username}/cart/{productId}")
	public ResponseEntity<String> addProductToCart(@PathVariable("username") String username, @PathVariable("productId")Long productId){
		
		Optional<Customer> c = this.customerRepo.findByUsername(username);
		Optional<Product> p = this.productRepo.findById(productId);
		if(!c.isPresent())
			throw new UserNotFoundException("User not found");
		if(!p.isPresent())
			throw new ProductNotFoundException("Product not found");
		List<CartItem> items = c.get().getCart();
		Optional<CartItem> item = items.stream()
				.filter(ci -> ci.getProduct().getId().equals(productId))
				.findAny();
		if(item.isPresent())
		{
			item.get().setCount(item.get().getCount() + 1);
		}
		else {
			CartItem newItem = new CartItem();
			newItem.setCount(1);
			newItem.setProduct(p.get());
			newItem.setCustomer(c.get());
			cartRepo.save(newItem);
		}
		customerRepo.save(c.get());
		return ResponseEntity.ok().body("Added Successfully");
		
	}
	
	
//	@GetMapping("/cart/{username}")
//	public ResponseEntity<List<Product>> getCartItems(@PathVariable("username") String username){
//		Optional<Customer> c = this.customerRepo.findByUsername(username);
//		
//		if(!c.isPresent())
//			throw new UserNotFoundException("User not found");
//		List<Product> products = Arrays.stream(c.get().getCartItems().split(","))
//				.filter(id -> !id.equals("null"))
//				.map(Long::valueOf)
//				.map(productRepo::findById)
//				.map(Optional<Product>::get)
//				.collect(Collectors.toList());
//		return ResponseEntity.ok().body(products);
//	}
	
	
	@GetMapping("/cart/{username}")
	public ResponseEntity<List<CartItem>> getCartItems(@PathVariable("username") String username){
		Optional<Customer> c = this.customerRepo.findByUsername(username);
		
		if(!c.isPresent())
			throw new UserNotFoundException("User not found");
		return ResponseEntity.ok().body(cartRepo.findByCustomer(c.get()));
	}
	
	
	@GetMapping("/order/{username}")
	@Transactional
	public ResponseEntity<String> placeOrder(@PathVariable("username") String username){
		Optional<Customer> c = this.customerRepo.findByUsername(username);
		if(!c.isPresent())
			throw new UserNotFoundException("User not found");
		
		List<Orders> orders = new ArrayList<>();
		
		for(CartItem item : c.get().getCart()) {
			Orders order = Orders.builder()
								.customer(c.get())
								.product(item.getProduct())
								.price(item.getCount() * item.getProduct().getPrice())
								.count(item.getCount())
								.orderedDate(new Date(System.currentTimeMillis()))
								.deliveryDate(new Date(System.currentTimeMillis()+ 5*24*60*60*1000))
								.build();
			orders.add(order);
		}
		
		
		this.orderRepo.saveAll(orders);
		this.cartRepo.deleteByCustomer(c.get());
		return ResponseEntity.accepted().body("Orders placed successfully");
		
	}
	
	
	@Transactional
	@DeleteMapping("/cart/remove/{id}")
	public ResponseEntity<String> removeCartItem(@PathVariable("id") Long cartId){
		
		this.cartRepo.deleteById(cartId);
		return ResponseEntity.ok().body("Cart Item deleted successfully");
	}
	
	@Transactional
	@DeleteMapping("/order/cancel/{id}")
	public ResponseEntity<String> cancelOrder(@PathVariable("id") Long orderId){
		
		this.orderRepo.deleteById(orderId);
		return ResponseEntity.ok().body("Order Cancelled successfully");
	}
	
	
	
	
}
