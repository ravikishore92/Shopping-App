package com.shopping.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import net.bytebuddy.asm.MemberSubstitution.Substitution.Chain;

@Component
public class JwtValidationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		if(token!=null) {
			token = token.split(" ")[1];
			
			Claims claims = Jwts.parser().setSigningKey("ramkumar".getBytes())
				.parseClaimsJws(token)
				.getBody();
		}
		filterChain.doFilter(request,response);
		
	}
	
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		String path = request.getRequestURI();
		return path.equals("/customers/login") ||
				path.equals("/admins/login") ||
				path.equals("/products") ||
				path.equals("/customers") ||
				path.equals("/admins");
	}

}
