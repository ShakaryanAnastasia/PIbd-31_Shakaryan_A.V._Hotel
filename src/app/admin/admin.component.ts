import { Component, OnInit } from '@angular/core';
import {Room} from './room'
import {RoomsService} from './room.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private roomsService: RoomsService) { }
  rooms:Room[];
  ngOnInit() {
    this.roomsService.getRooms().subscribe((rooms)=>{
      this.rooms = rooms;
      console.log(this.rooms);
    })
  }

}
