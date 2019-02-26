import { OnInit, AfterViewInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataObserverService } from './observer.service';
import { v4 as uuid } from 'uuid';
import { Subject } from 'rxjs';
import { transform, isEqual, isArray, isObject } from 'lodash';


@Injectable()
export class DataService implements OnInit, AfterViewInit {
    //data structure variables

    constructor(private dataObsever: DataObserverService, private _http: HttpClient) {
      

    }


     
    ngAfterViewInit() {
    }
    ngOnInit() {
    }   

 

}