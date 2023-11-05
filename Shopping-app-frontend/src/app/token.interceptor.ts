import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(private router : Router){
        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let header : HttpHeaders = new HttpHeaders({"Authorization" : `Bearer ${localStorage.getItem("token")}`});
        req = req.clone({headers : header});
        return next.handle(req);
    }



}