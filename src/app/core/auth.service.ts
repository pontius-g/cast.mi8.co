import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Router } from '@angular/router';
import { FireService } from './fire.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  constructor(private __router:Router, private __fire:FireService) {
    this.__fire.auth.authState
    .subscribe(
      d=>{
        //tmp
        console.log('AUTH: ', d);
      },
      e=>{ console.log('[fire.auth.authState] ERROR: ', e); }
    );
  }
  login() {
    this.__fire.auth.signInWithPopup(new this.__fire.base.auth.GoogleAuthProvider());
  }
}
