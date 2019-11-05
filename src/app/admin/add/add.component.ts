import { Component, OnInit } from '@angular/core';
import {Room} from '../room'
import {RoomsService} from '../room.service'
import {Router, ActivatedRoute} from '@angular/router'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private router: Router) { }
  room: Room = { id: null, title: null, description: null, price: null, images: [], images_files: [] };

  createOrupdate() {
    if (this.route.snapshot.data['mode'] == "edit") {
      this.updateRoom(this.room);
    }
    else {
      this.addRoom(this.room);
    }
    this.router.navigateByUrl('/admin');
  }

  updateRoom(room: Room) {
    this.roomsService.updateRoom(room).subscribe(result => {
      if (result.status == '201') {
        console.log("Room updated successfully: ", result.room.title)
        this.roomsService.addImages(room, result.room.id, 'edit').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
        }
    });
  }

  addRoom(room: Room) {
    this.roomsService.addRoom(room).subscribe(result => {
      if (result.status == '201') {
        console.log("Room added successfully: ", result.list)
        this.roomsService.addImages(room, result.list, 'add').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
      }
    });
  }

  addImage() {
    this.room.images.push({ id: null, original: "", small: null, room_id: this.room.id });
  }

  delImage(i: number) {
    this.room.images.splice(i, 1);
  }

  ngOnInit() {    
    console.log(this.route.snapshot);
    this.room.id = this.route.snapshot.params['id']*1;
    this.roomsService.getRoom(this.room.id).subscribe(result => {   
      if (result.status == '200') {
        this.room.title = result.list.title;
      this.room.description = result.list.description;
      this.room.price = result.list.price;
      this.room.images = result.list.images;
      }
    });
  }

  handleFileInput(files: FileList) {    
    this.room.images_files.push(files.item(0));    
  console.log("files ", this.room.images_files);
}

  ngOnChanges(){
    this.ngOnInit();
  }
}
