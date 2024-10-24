/**
 * 
 */
package com.intellect.igh.booking;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import com.intellect.igh.exception.ResourceNotFoundException;
import com.intellect.igh.room.Room;
import com.intellect.igh.room.RoomRepository;
import com.intellect.igh.user.User;
import com.intellect.igh.user.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * @author lakshmipriya.ramesh
 *
 */

@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingMapper bookingMapper;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Override
    public List<BookingRequest> createBookingRequest(List<BookingRequest> requests) {
        String loggedInUserId = getLoggedInUserId();
        User bookedBy = findUserById(loggedInUserId);

        List<Booking> bookings = requests.stream()
            .map(request -> {
                User bookedTo = findUserById(request.getBookedToId());
                request.setBookedDate(java.sql.Date.valueOf(java.time.LocalDate.now()));
                Room room = null;
                return bookingMapper.mapToBooking(request, bookedBy, bookedTo, room);
            })
            .collect(Collectors.toList());

        List<Booking> savedBookings = bookingRepository.saveAll(bookings);

        return savedBookings.stream()
            .map(bookingMapper::mapToBookingRequest)
            .collect(Collectors.toList());
    }

    @Override
    public List<BookingRequest> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
            .map(bookingMapper::mapToBookingRequest)
            .collect(Collectors.toList());
    }

    @Override
    public void updateRoomNumber(List<RoomUpdateRequest> updateRequests) {       
        for (RoomUpdateRequest updateRequest : updateRequests) {
            Booking booking = bookingRepository.findById(updateRequest.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with transaction id: " + updateRequest.getBookingId()));         
            Room updatedRoom = roomRepository.findById(updateRequest.getRoomId())
            		.orElseThrow(() -> new ResourceNotFoundException("Room not found with room number: " + updateRequest.getRoomId()));
            
            booking.setRoom(updatedRoom);
            bookingRepository.save(booking);
        }
    }
    
    @Override
	public User findUserById(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    @Override
	public Room findRoomByNumber(Integer roomNumber) {
        return roomRepository.findById(roomNumber)
            .orElseThrow(() -> new ResourceNotFoundException("Room not found with room number: " + roomNumber));
    }
    
    @Override
	public String getLoggedInUserId() {
        return getLoggedInUser().getAssoId();
    }
    
    @Override
    public User getLoggedInUser() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("User is not authenticated");
        }

        return (User) authentication.getPrincipal();
    	
    }
//    @Override
//    public String getLoggedInUserRole() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !authentication.isAuthenticated()) {
//            throw new SecurityException("User is not authenticated");
//        }
//        User loggedInUser = (User) authentication.getPrincipal();
//        return loggedInUser.getRoles().stream().findFirst().orElseThrow(() -> new SecurityException("Role not found")).getName();
//    }

	@Override
	public List<BookingRequest> getBookingsOfHR() {
		String loggedInUserId = getLoggedInUserId();
//        String role = getLoggedInUserRole();
//        
//        if (!"HR".equals(role)) {
//            throw new SecurityException("Only HR can access this endpoint");
//        }
		List<Booking> bookings = bookingRepository.findByBookedByAssoId(loggedInUserId);
        return bookings.stream()
            .map(bookingMapper::mapToBookingRequest)
            .collect(Collectors.toList());
		
	}

	@Override
	public List<BookingHistory> getBookingHistory() {
		String loggedInUserId = getLoggedInUserId();
		List<Booking> bookings = bookingRepository.findByBookedToAssoId(loggedInUserId);
		return bookings.stream()
		        .map(bookingMapper::mapToBookingHistory)
		        .sorted(Comparator.comparing(BookingHistory::getCheckInDate))
		        .collect(Collectors.toList());
	}

	@Override
	public List<BookingRequest> getAllNotAllotedBookings() {
		List<Booking> bookings = bookingRepository.findByRoomIsNull();
		return bookings.stream()
	            .map(bookingMapper::mapToBookingRequest)
	            .collect(Collectors.toList());
	}

    @Override
    public List<BookingHistory> getBookingRequestsByRoomType(String roomType) {
        List<Booking> bookings = bookingRepository.findByRoomType(roomType);
        return bookings.stream()
            .map(bookingMapper::mapToBookingHistory)
            .collect(Collectors.toList());
    }

    @Override
    public List<BookingRequest> getBookingRequestsByRoomId(Integer roomId) {
        List<Booking> bookings = bookingRepository.findByRoom_RoomId(roomId);
        return bookings.stream()
            .filter(booking -> booking.getRoom().getRoomNumber() != null) // add this filter
            .map(bookingMapper::mapToBookingRequest)
            .collect(Collectors.toList());
    }

}


