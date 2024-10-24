/**
 * 
 */
package com.intellect.igh.auth;

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
public class AuthenticationResponse {
	private String token;
}
