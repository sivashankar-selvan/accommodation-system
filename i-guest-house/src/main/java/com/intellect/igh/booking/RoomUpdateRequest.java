/**
 * 
 */
package com.intellect.igh.booking;

import lombok.Data;

/**
 * @author lakshmipriya.ramesh
 *
 */

@Data
public class RoomUpdateRequest {
	private Long bookingId;
	private Integer roomId;
}
