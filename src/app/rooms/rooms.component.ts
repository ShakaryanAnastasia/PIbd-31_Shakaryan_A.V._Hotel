import { Component, OnInit } from '@angular/core';
import {Room} from '../admin/room'
import {RoomsService} from '../admin/room.service'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.less']
})
export class RoomsComponent implements OnInit {

  constructor(private roomsService: RoomsService) { }
  rooms:Room[];

  ngOnInit() {
    this.roomsService.getRooms().subscribe((rooms)=>{
      this.rooms = rooms.list;
      console.log(this.rooms);
    })
  }

}
