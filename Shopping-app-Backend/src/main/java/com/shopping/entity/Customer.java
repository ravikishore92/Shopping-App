package com.shopping.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String address;
	
	private String contact;
	private String email;
	
	@OneToMany(mappedBy="customer",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Orders> orders = new ArrayList<>();
	
	@OneToMany(mappedBy="customer",fetch=FetchType.LAZY)
	private List<CartItem> cart = new ArrayList<>();
	private String cartItems;
	
	private String username;
	private String password;
	
}
