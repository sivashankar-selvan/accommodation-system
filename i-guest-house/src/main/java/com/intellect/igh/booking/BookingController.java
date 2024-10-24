/**
 * 
 */
package com.intellect.igh.booking;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * @author lakshmipriya.ramesh
 *
 */

@RequiredArgsConstructor
@RestController
@RequestMapping("booking")
public class BookingController {
	
	private final BookingService bookingService;
	
	@PostMapping
	public ResponseEntity<List<BookingRequest>> createBookingRequest(@RequestBody List<BookingRequest> requests) {
	    List<BookingRequest> savedRequests = bookingService.createBookingRequest(requests);
	    return new ResponseEntity<List<BookingRequest>>(savedRequests,HttpStatus.CREATED);
	}

	@GetMapping
    public ResponseEntity<List<BookingRequest>> getAllBookings() {
        List<BookingRequest> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
	
	@GetMapping("/notAlloted")
	public ResponseEntity<List<BookingRequest>> getAllNotAllotedBookings() {
		List<BookingRequest> bookings = bookingService.getAllNotAllotedBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
	}
	
	@GetMapping("/HR")
	public ResponseEntity<List<BookingRequest>> getBookingsOfHR() {
		List<BookingRequest> bookings = bookingService.getBookingsOfHR();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<BookingHistory>> getBookingHistory() {
		List<BookingHistory> history = bookingService.getBookingHistory();
		return new ResponseEntity<>(history, HttpStatus.OK);
	}
	
    @GetMapping("/roomType/{roomType}")
    public ResponseEntity<List<BookingHistory>> getBookingRequestsByRoomType(
        @PathVariable("roomType") String roomType) {
        List<BookingHistory> bookings = bookingService.getBookingRequestsByRoomType(roomType);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
    
    @GetMapping("/roomId/{roomId}")
    public ResponseEntity<List<BookingRequest>> getBookingRequestsByRoomId(
        @PathVariable("roomId") Integer roomId) {
        List<BookingRequest> bookings = bookingService.getBookingRequestsByRoomId(roomId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
	
	@PutMapping("/update-room-number")
	public ResponseEntity<String> updateRoomNumber(@RequestBody List<RoomUpdateRequest> updateRequests) {
	    bookingService.updateRoomNumber(updateRequests);
	    return ResponseEntity.ok("Room numbers updated successfully.");
	}	
	
}
