/**
 * 
 */
package com.intellect.igh.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.intellect.igh.user.User;

import java.util.Optional;

/**
 * @author lakshmipriya.ramesh
 *
 */
public class ApplicationAuditAware implements AuditorAware<String>{

	@Override
	public Optional<String> getCurrentAuditor() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    
	    if (authentication == null ||
	        !authentication.isAuthenticated() ||
	        authentication instanceof AnonymousAuthenticationToken) {
	        return Optional.empty();
	    }

	    User userPrincipal = (User) authentication.getPrincipal();
	    
	    return Optional.ofNullable(userPrincipal.getAssoId());
	}
	
}
