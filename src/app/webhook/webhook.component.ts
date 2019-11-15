import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomsService } from '../admin/room.service';
@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.less']
})
export class WebhookComponent implements OnInit {

  constructor(private roomsService: RoomsService) { 
    this.observable_message.subscribe(val => {
      if (this.messages){     
        this.messages.push(val);
        console.log(this.messages); 
        let message = JSON.parse(val).object.body.split(',');
        console.log(message);
        if (message[0] == 'Комната'){
          let d = {id: null, title: message[1], description: message[2], price: message[3], images: [], images_files: []};
          this.roomsService.addRoom(d).subscribe(result => {
            if (result.status == '201') {
              console.log("Room added successfully: ", result.list);  
              }          
            });   
          }            
      }
    });
  }

  messages:string[] = [];
  observable_message = new Subject<string>();


  ngOnInit() {
    var socket = new WebSocket("wss://iphotelwebsocket.herokuapp.com");

    let mess = this.observable_message;

    socket.onmessage = function(event) {     
      mess.next(event.data);
    };
  }

}
