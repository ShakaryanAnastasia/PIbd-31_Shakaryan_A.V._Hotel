import {Injectable} from '@angular/core'
import{HttpClient, HttpParams} from '@angular/common/http'
import {HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'
import {catchError} from 'rxjs/operators'

import {Room} from './room'
import {HttpErrorHandler, HandleError} from '../http-error-handler.service'

@Injectable()
export class RoomsService{
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandlerError('RoomsService')
    }

    getRooms(): Observable<Room[]>{
        return this.http
        .get<Room[]>('api/rooms')
        .pipe(catchError(this.handleError('getRooms', [])))
    }

    addRoom(room: Room): Observable<Room>{
        return this.http
        .post<Room>('api/room', room)
        .pipe(catchError(this.handleError('addRoom', room)))
    }

    deleteRoom(id: number): Observable<{}>{
        const url = 'api/room/${id}'
        return this.http
        .delete(url)
        .pipe(catchError(this.handleError('deleteRoom')))
    }

    updateRoom(room: Room): Observable<Room>{        
        return this.http
        .put<Room>('api/room/${room.id}', room)
        .pipe(catchError(this.handleError('updateRoom', room)))
    }
}