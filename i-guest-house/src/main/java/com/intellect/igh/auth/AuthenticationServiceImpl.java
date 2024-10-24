/**
 * 
 */
package com.intellect.igh.auth;

import java.util.HashMap;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.intellect.igh.exception.ResourceNotFoundException;
import com.intellect.igh.role.Role;
import com.intellect.igh.role.RoleRepository;
import com.intellect.igh.security.JwtService;
import com.intellect.igh.user.User;
import com.intellect.igh.user.UserRepository;
import com.intellect.igh.user.UserRequest;

import lombok.RequiredArgsConstructor;


/**
 * @author lakshmipriya.ramesh
 *
 */

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl{
	
	private final AuthenticationManager authenticationManager;
	private final JwtService jwtService;
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
	
	
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
		var auth = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(), 
						request.getPassword()
				)
		);
		var claims = new HashMap<String, Object>();
		var user = ((User)auth.getPrincipal());
		claims.put("fullName", user.fullName());
		var jwtToken = jwtService.generateToken(claims, (UserDetails) user);
		return AuthenticationResponse.builder()
				.token(jwtToken).build();
	}

	
    public User createUser(UserRequest userRequest) {
        Role role = roleRepository.findById(userRequest.getRoleId())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + userRequest.getRoleId()));
        return userRepository.save(
        		User.builder()
        		.assoId(userRequest.getAssoId())
        		.assoLevel(userRequest.getAssoLevel())
        		.firstName(userRequest.getFirstName())
        		.lastName(userRequest.getLastName())
        		.email(userRequest.getEmail())
        		.password(passwordEncoder.encode(userRequest.getPassword()))
        		.mobileNumber(userRequest.getMobileNumber())
        		.enabled(true)
        		.roles(Set.of(role))
        		.build()
        		);        
    }
}
