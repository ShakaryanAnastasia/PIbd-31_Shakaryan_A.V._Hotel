import { Component, OnInit } from '@angular/core';
import {Room} from '../admin/room'
import {RoomsService} from '../admin/room.service'
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.less']
})
export class RoomsComponent implements OnInit {

  constructor(private roomsService: RoomsService) { 
    this.observable.pipe(debounceTime(1000))
    .subscribe(val =>{
      this.roomsService.getResult(val).subscribe(result => {
        console.log("res ", result.list);
        this.rooms = result.list;
      });
    })
  }
  rooms:Room[];

  observable = new Subject<string>()
  text: string;

  ngOnInit() {
    this.roomsService.getRooms().subscribe((rooms)=>{
      this.rooms = rooms.list;
      for (let room of rooms.list) {
        for (let image of room.images){        
          this.roomsService.getImage(image.original).subscribe(res => {
            if (res.link){
              image.original = res.link;
            }
          });       
        }}  
      console.log(this.rooms);
    })
  }

  change(value: string){
    this.observable.next(value);
    console.log("dsfs: " + value);
  }
}
