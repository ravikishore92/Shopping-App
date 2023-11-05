//package com.shopping.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import com.shopping.service.UserService;
//
//@Configuration
//public class SecurityConfiguration {
//
//	public static String SECRET_KEY = "RAMKUMAR";
//	
//	@Bean
//	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
//		return http.csrf().disable()
//			.authorizeHttpRequests(a->a
//					.antMatchers(HttpMethod.POST,"/users/admin","/products").hasRole("ADMIN")
//					.antMatchers("/users/**").permitAll()
//					.anyRequest().authenticated()
//					)
//			.cors().and()
//			
//			.build();
//			
//	}
//	
//	@Bean
//	public PasswordEncoder encoder() {
//		return new BCryptPasswordEncoder();
//	}
//}
