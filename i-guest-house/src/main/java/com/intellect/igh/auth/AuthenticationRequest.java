/**
 * 
 */
package com.intellect.igh.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * @author lakshmipriya.ramesh
 *
 */

@Getter
@Setter
@Builder
public class AuthenticationRequest {
	
	@Email(message = "Email is not formatted")
	@NotEmpty(message = "Email is mandatory")
	@NotBlank(message = "Email is mandatory")
	private String email;
	
	@NotEmpty(message = "Password is mandatory")
	@NotBlank(message = "Password is mandatory")
	@Size(min=8,message = "Password should be minimum 8 characters")
	private String password;

}
