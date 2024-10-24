/**
 * 
 */
package com.intellect.igh.booking;

import java.sql.Date;

import lombok.Data;
import lombok.experimental.SuperBuilder;

/**
 * @author lakshmipriya.ramesh
 *
 */

@Data
@SuperBuilder
public class BookingHistory {
	
	private Long bookingId;

	private Date checkInDate;

	private Date checkOutDate;
	
	private Integer roomNumber;
	
	private Integer floorNumber;
	
	private Integer towerNumber;
	
	private Date bookedDate;
	
	private String userName;
}
