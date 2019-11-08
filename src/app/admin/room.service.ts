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

   dropbox = {
    headers: new HttpHeaders({
    'Authorization': 'Bearer K4kbUK1-PfAAAAAAAAAAE7OW00DQJ6fMPUK5Ov_ULUHmXYAPHLdakyuENOKIY3_d',
    'Content-Type': 'application/json'
})};

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
            .pipe(catchError(this.handleError('addRoom', room)));
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

    addImages(room: Room, id: string, mode: string) : Observable<any> {
        const formData: FormData = new FormData();
        const id_json = JSON.stringify(id); 
        const mode_json = JSON.stringify(mode); 
        const room_id = new Blob([id_json], {
              type: 'application/json'
        });        
        const img_mode = new Blob([mode_json], {
              type: 'application/json'
        });
        formData.append(id, room_id);
        formData.append(mode, img_mode);
        for(var i = 0; i < room.images_files.length; i++){ 
            formData.append('images_files_'+i, room.images_files[i]);
        }
        return this.http
            .post('api/upload_to_dropbox', formData, this.options)
            .pipe(catchError(this.handleError('addImages', formData)));
    }

    getImage(path: string) : Observable<any>{
        const data: any = { 
            "path": path
        };

        return this.http
            .post('https://api.dropboxapi.com/2/files/get_temporary_link', <JSON>data, this.dropbox)
            .pipe(catchError(this.handleError('getImage', <JSON>data)));
    }

    getResult(text: string): Observable<any>{
        const data: any = { 
            "text": text
        };
        return this.http
        .post('api/search', <JSON>data, this.options)
        .pipe(catchError(this.handleError('getResult', text)));

    }
}  