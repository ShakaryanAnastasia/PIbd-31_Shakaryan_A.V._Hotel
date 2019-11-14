import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { authService } from '../authService';
import {RoomsService} from '../admin/room.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Hotel';

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private authService: authService, private roomService: RoomsService) {
    this.authService.getUserName().subscribe(result =>{
      this.user_name = result.text;
    });
    this.authService.getToken().subscribe(result =>{
      this.token = result.text;
    });
    this.roomService.getDT().subscribe(result =>{
      if (result){
        this.cookieService.set('dropbox_token', result.token);
      }
    });
  }


user_name:any;
token:any;

  ngOnInit() {
    this.authService.sendToken(this.cookieService.get('token'));
    this.authService.sendUserName(this.cookieService.get('user_name'));
    console.log('user name: ' + this.user_name);
    console.log('token: ' + this.token);
  }

  logout(){
    this.userService.logout().subscribe(result => {      
        console.log(result.message);
        this.authService.clearMessage();        
        this.router.navigateByUrl('/home');    
    });
  }
}
