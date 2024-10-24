/**
 * 
 */
package com.intellect.igh.booking;

import java.sql.Date;

import com.intellect.igh.room.Room;
import com.intellect.igh.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author lakshmipriya.ramesh
 *
 */

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookingId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booked_by", referencedColumnName = "assoId")
	private User bookedBy;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "room_id", referencedColumnName = "roomId")
	private Room room;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "booked_to", referencedColumnName = "assoId")
	private User bookedTo;
	
	private Date checkInDate;
	private Date checkOutDate;
	private String roomType;
	private String guestName;
	private Date bookedDate;
	
}
