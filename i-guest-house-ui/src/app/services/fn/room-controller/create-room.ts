/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Room } from '../../models/room';

export interface CreateRoom$Params {
      body: Room
}

export function createRoom(http: HttpClient, rootUrl: string, params: CreateRoom$Params, context?: HttpContext): Observable<StrictHttpResponse<Room>> {
  const rb = new RequestBuilder(rootUrl, createRoom.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Room>;
    })
  );
}

createRoom.PATH = '/rooms';
