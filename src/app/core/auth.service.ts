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
        if (d) console.log('[fire.auth.authState] AUTH: ', d);
      },
      e=>{ console.log('[fire.auth.authState] ERROR: ', e); }
    );
  }
  login() {
    this.__fire.auth.auth.signInWithPopup(new this.__fire.base.auth.GoogleAuthProvider())
    .catch(e=>{console.log('[fire.auth.auth.signInWithPopup] ERROR: ', e);});
  }
}
