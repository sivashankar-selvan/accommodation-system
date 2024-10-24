/**
 * 
 */
package com.intellect.igh.booking;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author lakshmipriya.ramesh
 *
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
    List<Booking> findByBookedByAssoId(String bookedById);
    List<Booking> findByRoomType(String roomType);
    List<Booking> findByBookedToAssoId(String bookedToId);
    List<Booking> findByRoomIsNull();
    List<Booking> findByRoom_RoomId(Integer roomId);

}
