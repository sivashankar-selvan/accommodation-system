/**
 * 
 */
package com.intellect.igh.booking;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * @author lakshmipriya.ramesh
 *
 */

@NoArgsConstructor
@AllArgsConstructor
@Data
@SuperBuilder
public class BookingRequest {
	
	private Long bookingId;
	
	private Integer roomNumber;
	
	private Integer roomId;
	
	@NotBlank(message = "Guest name can't be blank")
	private String guestName;
	
	@NotBlank(message = "Booked to AssoId is required")
	private String bookedToId;
	
	@NotBlank(message = "Type of room required")
	private String roomType;
	
	@NotNull(message = "Check in date required")
	private Date checkInDate;
	
	@NotNull(message = "Check out date required")
	private Date checkOutDate;
	
	private Date bookedDate;
}
