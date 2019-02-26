import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MDBBootstrapModule, DropdownModule, NavbarModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http'; 
import {DataObserverService} from './services/observer.service';
import {WebsocketService} from './services/websocket.service';
import { LoginComponent } from './components/login/login.component';
import { NguCarouselModule } from '@ngu/carousel';
import { ContenteditableModule } from 'ng-contenteditable';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

// Configs  
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("327938144426514")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("819463399376-m6708sjie7ojdo6o40ein42gblninvth.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}
// jVn2Z4OHnyKTVN5xW_0Vo4e1
// import { WsUiQueryComponent } from './ws-ui-query/ws-ui-query.component';
// import { WsUiReplyComponent } from './ws-ui-reply/ws-ui-reply.component';
// import { WsUiEntityComponent } from './ws-ui-entity/ws-ui-entity.component';
// import { QnaUiComponent } from './work-station/qna-ui/qna-ui.component';
// import { JourneyUiComponent } from './work-station/journey-ui/journey-ui.component';
// import { EntityUiComponent } from './work-station/entity-ui/entity-ui.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // WsUiQueryComponent,
    // WsUiReplyComponent,
    // WsUiEntityComponent
    // QnaUiComponent,
    // JourneyUiComponent,
    // EntityUiComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule  ,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    NguCarouselModule,
    ContenteditableModule,
    BrowserAnimationsModule,
    NgxAutoScrollModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  // exports:[
  //   KeysPipe],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },DataService, DataObserverService, WebsocketService],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
