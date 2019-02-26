import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataObserverService {
  
  data: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {

    this.data = <Subject<any>>wsService
      .connect()
      .pipe(map(response => {
        return response;
      }))
   }
  
  // Our simplified interface for sending
  // messages back to our socket.io server
  broadcastData(data) {
    this.data.next(data);
  }

  getErrorStream(){
    return this.wsService.getErrorStream();
  }

  getSocketConnection(){
    return this.wsService.getSocketConnection();
  }

  requestData(data) {
    return new Promise((resolve,reject)=>{
      this.wsService.sendRequest(data).
      subscribe((response)=>{
          return resolve(response)
      });
    })
  }

  

}
