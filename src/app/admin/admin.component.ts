import { Component, OnInit } from '@angular/core';
import {Room} from './room';
import {RoomsService} from './room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private roomsService: RoomsService, private router: Router) { }
  rooms:Room[];


  deleteRoom(id: number) {
    this.roomsService.deleteRoom(id).subscribe(status => {
      if (status == '204') {
        console.log("Room deleted successfully: ", id)
      }
    });
    location.reload();
  }

  getRoom(id: number) {
    this.roomsService.getRoom(id).subscribe(result => {
      console.log(result.list.title);
    });
  }

  ngOnInit() {
    this.roomsService.getRooms().subscribe((rooms)=>{
      this.rooms = rooms.list;
      console.log(this.rooms);
    })
  }

  ngOnChanges(){
    this.ngOnInit();
  }
}
