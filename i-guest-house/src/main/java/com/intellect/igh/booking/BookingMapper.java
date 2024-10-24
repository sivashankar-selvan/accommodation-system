package com.intellect.igh.booking;

import org.springframework.stereotype.Component;
import com.intellect.igh.room.Room;
import com.intellect.igh.user.User;

@Component
public class BookingMapper {

	public Booking mapToBooking(BookingRequest request, User bookedBy, User bookedTo, Room room) {
        return Booking.builder()
                .bookedBy(bookedBy)
                .bookedTo(bookedTo)
                .guestName(request.getGuestName())
                .room(room)
                .roomType(request.getRoomType())
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .bookedDate(request.getBookedDate())
                .build();
    }

    public BookingRequest mapToBookingRequest(Booking booking) {
    	return BookingRequest.builder()
    			.bookingId(booking.getBookingId())
    			.bookedToId(booking.getBookedTo().getAssoId())
    			.guestName(booking.getGuestName())
    			.roomNumber(booking.getRoom() != null ? booking.getRoom().getRoomNumber() : null)
    			.roomId(booking.getRoom() != null ? booking.getRoom().getRoomId() : null)
    			.roomType(booking.getRoomType())
    			.checkInDate(booking.getCheckInDate())
    			.checkOutDate(booking.getCheckOutDate())
    			.bookedDate(booking.getBookedDate())
    			.build();
    }
    
    public BookingHistory mapToBookingHistory(Booking booking) {
        return BookingHistory.builder()
        		.bookingId(booking.getBookingId())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .roomNumber(booking.getRoom() != null ? booking.getRoom().getRoomNumber() : null)
                .floorNumber(booking.getRoom() != null ? booking.getRoom().getFloorNumber() : null)
                .towerNumber(booking.getRoom() != null ? booking.getRoom().getTowerNumber() : null)
                .userName(booking.getBookedTo().fullName())
                .bookedDate(booking.getBookedDate())
                .build();
    }
}
