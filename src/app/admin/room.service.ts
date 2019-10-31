import {Injectable} from '@angular/core'
import{HttpClient, HttpParams} from '@angular/common/http'
import {HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'

import {Room} from './room'
import {HttpErrorHandler, HandleError} from '../http-error-handler.service'
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class RoomsService{
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private cookieService: CookieService){
        this.handleError = httpErrorHandler.createHandlerError('RoomsService')
    }


    options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))
      };
   // link: string = 'https://iphotelbackend.herokuapp.com/';

    getRooms(): Observable<any> {
        return this.http
           // .get(this.link + 'api/rooms')
            .get('api/rooms', this.options)
            .pipe(catchError(this.handleError('getRooms')))
    }

    getRoom(id: number): Observable<any> {
        const url = 'api/rooms/' + id;
        return this.http
            //.get(this.link + url)
            .get(url, this.options)
            .pipe(catchError(this.handleError('getRoom', id)))
    }

    addRoom(room: Room): Observable<any> {
        return this.http
            //.post(this.link + 'api/rooms', room)
            .post('api/rooms', room, this.options)
            .pipe(catchError(this.handleError('addRoom', room)))
    }

    deleteRoom(id: number): Observable<any> {
        const url = 'api/rooms/' + id;
        return this.http
            //.delete(this.link + url)
            .delete(url, this.options)
            .pipe(catchError(this.handleError('deleteRoom', id)))
    }

    updateRoom(room: Room): Observable<any> {
        const url = 'api/rooms/' + room.id;
        return this.http
            //.put(this.link + url, room)
            .put(url, room, this.options)
            .pipe(catchError(this.handleError('updateRoom', room)))
    }

}