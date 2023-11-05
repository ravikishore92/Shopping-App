package com.shopping.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shopping.entity.Customer;
import com.shopping.entity.Orders;


@Repository
public interface OrderRepository extends JpaRepository<Orders,Long>{

	void deleteByCustomer(Customer customer);
}
