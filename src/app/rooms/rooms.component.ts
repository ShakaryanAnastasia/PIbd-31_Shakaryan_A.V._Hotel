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
    });
    this.observable_id.subscribe(val => {
      if (this.rooms){
        this.deleteRoom(val);
      }
    });
    this.observable_room.subscribe(val =>{
      if (this.rooms){
        this.addRoom(val);
      }
    });
  }

  rooms:Room[];

  observable = new Subject<string>()
  text: string; 
  observable_id = new Subject<Number>();
  observable_room = new Subject<any>();


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

    var socket = new WebSocket("wss://iphotelwebsocket.herokuapp.com");

    let room = this.observable_room;
    let id = this.observable_id;

    socket.onmessage = function(event) {     
      process(event.data);
    };

    function process(data){
      if (Number(data)){
        id.next(Number(data));
      }
      else {
        room.next(JSON.parse(data));
      }
    };
    });    
  }

  change(value: string){
    this.observable.next(value);
    console.log("dsfs: " + value);
  }

  deleteRoom(id:Number){
    for (var i = 0; i < this.rooms.length; i++){
      if (this.rooms[i].id == id){
        this.rooms.splice(i, 1);
      }
    };
    console.log(this.rooms);
  }

  addRoom(data:any){
    console.log(data);
    let room = {id: data.id, title: data.title, description: data.description, price: data.price, images: [], images_files: [] };
    if (!(this.rooms.some(rom => rom === room))){
    this.rooms.push(room);
    }
  }
}
