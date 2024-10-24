/**
 * 
 */
package com.intellect.igh.booking;

import java.util.List;

import com.intellect.igh.room.Room;
import com.intellect.igh.user.User;

/**
 * @author lakshmipriya.ramesh
 *
 */

public interface BookingService {

	List<BookingRequest> createBookingRequest(List<BookingRequest> requests);

	List<BookingRequest> getAllBookings();	

	void updateRoomNumber(List<RoomUpdateRequest> updateRequests);

	List<BookingRequest> getBookingsOfHR();
	
	User findUserById(String userId);
	
	Room findRoomByNumber(Integer roomNumber);
	
	String getLoggedInUserId();

	List<BookingHistory> getBookingHistory();

	List<BookingRequest> getAllNotAllotedBookings();

	User getLoggedInUser();

	List<BookingHistory> getBookingRequestsByRoomType(String roomType);

	List<BookingRequest> getBookingRequestsByRoomId(Integer roomId);

}
