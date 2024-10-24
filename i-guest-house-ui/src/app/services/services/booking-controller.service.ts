/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookingHistory } from '../models/booking-history';
import { BookingRequest } from '../models/booking-request';
import { createBookingRequest } from '../fn/booking-controller/create-booking-request';
import { CreateBookingRequest$Params } from '../fn/booking-controller/create-booking-request';
import { getAllBookings } from '../fn/booking-controller/get-all-bookings';
import { GetAllBookings$Params } from '../fn/booking-controller/get-all-bookings';
import { getAllNotAllotedBookings } from '../fn/booking-controller/get-all-not-alloted-bookings';
import { GetAllNotAllotedBookings$Params } from '../fn/booking-controller/get-all-not-alloted-bookings';
import { getBookingHistory } from '../fn/booking-controller/get-booking-history';
import { GetBookingHistory$Params } from '../fn/booking-controller/get-booking-history';
import { getBookingRequestsByRoomType } from '../fn/booking-controller/get-booking-requests-by-room-type';
import { GetBookingRequestsByRoomType$Params } from '../fn/booking-controller/get-booking-requests-by-room-type';
import { getBookingsOfHr } from '../fn/booking-controller/get-bookings-of-hr';
import { GetBookingsOfHr$Params } from '../fn/booking-controller/get-bookings-of-hr';
import { updateRoomNumber } from '../fn/booking-controller/update-room-number';
import { UpdateRoomNumber$Params } from '../fn/booking-controller/update-room-number';

@Injectable({ providedIn: 'root' })
export class BookingControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateRoomNumber()` */
  static readonly UpdateRoomNumberPath = '/booking/update-room-number';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRoomNumber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRoomNumber$Response(params: UpdateRoomNumber$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return updateRoomNumber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRoomNumber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRoomNumber(params: UpdateRoomNumber$Params, context?: HttpContext): Observable<string> {
    return this.updateRoomNumber$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getAllBookings()` */
  static readonly GetAllBookingsPath = '/booking';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Response(params?: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingRequest>>> {
    return getAllBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings(params?: GetAllBookings$Params, context?: HttpContext): Observable<Array<BookingRequest>> {
    return this.getAllBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingRequest>>): Array<BookingRequest> => r.body)
    );
  }

  /** Path part for operation `createBookingRequest()` */
  static readonly CreateBookingRequestPath = '/booking';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBookingRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBookingRequest$Response(params: CreateBookingRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingRequest>>> {
    return createBookingRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createBookingRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBookingRequest(params: CreateBookingRequest$Params, context?: HttpContext): Observable<Array<BookingRequest>> {
    return this.createBookingRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingRequest>>): Array<BookingRequest> => r.body)
    );
  }

  /** Path part for operation `getBookingHistory()` */
  static readonly GetBookingHistoryPath = '/booking/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookingHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingHistory$Response(params?: GetBookingHistory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingHistory>>> {
    return getBookingHistory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookingHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingHistory(params?: GetBookingHistory$Params, context?: HttpContext): Observable<Array<BookingHistory>> {
    return this.getBookingHistory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingHistory>>): Array<BookingHistory> => r.body)
    );
  }

  /** Path part for operation `getBookingRequestsByRoomType()` */
  static readonly GetBookingRequestsByRoomTypePath = '/booking/roomType/{roomType}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookingRequestsByRoomType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingRequestsByRoomType$Response(params: GetBookingRequestsByRoomType$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingHistory>>> {
    return getBookingRequestsByRoomType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookingRequestsByRoomType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingRequestsByRoomType(params: GetBookingRequestsByRoomType$Params, context?: HttpContext): Observable<Array<BookingHistory>> {
    return this.getBookingRequestsByRoomType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingHistory>>): Array<BookingHistory> => r.body)
    );
  }

  /** Path part for operation `getAllNotAllotedBookings()` */
  static readonly GetAllNotAllotedBookingsPath = '/booking/notAlloted';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllNotAllotedBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotAllotedBookings$Response(params?: GetAllNotAllotedBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingRequest>>> {
    return getAllNotAllotedBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllNotAllotedBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotAllotedBookings(params?: GetAllNotAllotedBookings$Params, context?: HttpContext): Observable<Array<BookingRequest>> {
    return this.getAllNotAllotedBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingRequest>>): Array<BookingRequest> => r.body)
    );
  }

  /** Path part for operation `getBookingsOfHr()` */
  static readonly GetBookingsOfHrPath = '/booking/HR';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBookingsOfHr()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingsOfHr$Response(params?: GetBookingsOfHr$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingRequest>>> {
    return getBookingsOfHr(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBookingsOfHr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBookingsOfHr(params?: GetBookingsOfHr$Params, context?: HttpContext): Observable<Array<BookingRequest>> {
    return this.getBookingsOfHr$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingRequest>>): Array<BookingRequest> => r.body)
    );
  }

}
