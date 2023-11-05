package com.shopping.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.entity.CartItem;
import com.shopping.entity.Customer;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>{

	List<CartItem> findByCustomer(Customer customer);
	
	void deleteByCustomer(Customer customer);
}
