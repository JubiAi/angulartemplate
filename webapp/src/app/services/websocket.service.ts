import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private sendSocket;
  sendUrl = environment.socketUrl
  path=environment.socketPath
  globalIncomingMessages=environment.broadcastListeners
  errorObservable = new Subject<any>();
  errorStream$ = this.errorObservable.asObservable()

  constructor() { 
    this.sendSocket = io(this.sendUrl, {
      path: this.path,
      transports: [ 'websocket' ]  
    });
  }

  connect(): Rx.Subject<MessageEvent> {
    let observable = new Observable(observer => {
      for (let message of this.globalIncomingMessages) {
        this.sendSocket.on(message, (data) => {
          if(data.error){
            console.log(data.error)
            return;
          }
          observer.next({requestType:message,data:data});
        })
      }
      return () => {
        console.log("DISCONNECTED")
       this.sendSocket.disconnect();
      }
    });


    let observer = {
      next: (data) => {
        this.sendSocket.emit(data.requestType, data.data);
      }
    };

    return Rx.Subject.create(observer, observable);
  }
  public sendRequest(data: any) {
    let responseFlag=false;
      let requestObservable = new Subject<any>();
      let requestStream$ = requestObservable.asObservable()
      this.sendSocket.on(data.requestType+"-"+data.requestId, (resp) => {
        if(resp.error){
          console.log(resp.error)
          this.errorObservable.next(resp);
          return;
        }
        requestObservable.next({data:resp,eventMessage:data.requestType+"-"+data.requestId});
        responseFlag=true;
      })
      this.sendSocket.emit(data.requestType, data);
      setTimeout(()=>{
        requestObservable.unsubscribe();
        if(!responseFlag){
          this.errorObservable.next("Unsubscribing. Response timed out.");
        }
      },50*1000)
      return requestStream$;
  }

  public getErrorStream(){
    return this.errorStream$;
  }
  public getSocketConnection(){
    return this.sendSocket;
  }
}

