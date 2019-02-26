import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  title = 'app';
  showNav = true;
  showBot = false;
  size = "m"
  data: any

  constructor(private _dataService: DataService) {

  
  }

 


  hideNav() {
    console.log("tooglenav")
    this.showNav = false
    this.size = "m"
    if (!this.showBot) {
      this.size = "l"
    }
  }
  hideBot() {
    console.log("tooglebot")
    this.showBot = false
    this.size = "m"
    if (!this.showNav) {
      this.size = "l"
    }
  }
  viewBot() {
    console.log("tooglebot")
    this.showBot = true
    this.size = "m"
    if (this.showNav) {
      this.size = "s"
    }
  }

  navVisible() {
    if (!this.showNav) {
      return "remove"
    }
    return "show"
  }
  botVisible() {
    // console.log(this.showBot)
    if (!this.showBot) {
      return "remove"
    }
    return "show"
  }
  ngAfterViewInit() {
  }
  ngAfterContentInit() {


  }
  ngOnInit() {
    // this._dataService.initialize()
  }


}


