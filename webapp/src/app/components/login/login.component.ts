import { Component, OnInit,ViewChild, ElementRef,AfterViewChecked,AfterViewInit, Output,EventEmitter} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() 
  login = new EventEmitter();
  constructor( private socialAuthService: AuthService,private _dataService : DataService ) {}
  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    else if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider)
      .then(
      (userData) => {
        this.login.emit(userData);
      }
    )
    .catch((e)=>{
      console.log(e)
    });
  }


  credLogin(event){
    console.log(event)
  }

ngOnInit() {
}
}
