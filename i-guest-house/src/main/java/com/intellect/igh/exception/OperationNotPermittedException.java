/**
 * 
 */
package com.intellect.igh.exception;

/**
 * @author lakshmipriya.ramesh
 *
 */
public class OperationNotPermittedException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public OperationNotPermittedException() {
    }

    public OperationNotPermittedException(String message) {
        super(message);
    }
}
