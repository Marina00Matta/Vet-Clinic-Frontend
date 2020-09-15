import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req, next)
  {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.get()}` 
    }
    })
    return next.handle(tokenizedReq)
  }

}
