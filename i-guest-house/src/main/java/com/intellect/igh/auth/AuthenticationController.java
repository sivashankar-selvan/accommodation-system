/**
 * 
 */
package com.intellect.igh.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellect.igh.user.UserRequest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * @author lakshmipriya.ramesh
 *
 */

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationServiceImpl service;
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(
		@RequestBody @Valid AuthenticationRequest request
	) {
		return ResponseEntity.ok(service.authenticate(request));
	}
	
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid UserRequest request) {
        service.createUser(request);
        return ResponseEntity.ok(new AuthenticationResponse("User registered successfully"));
    }
}
