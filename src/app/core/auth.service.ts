import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Router } from '@angular/router';
import { FireService, AuthProvider, AuthUser } from './fire.service';
import { psAuthUser, psAuthLicense } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  private __lic:psAuthLicense;
  private __authData$: BehaviorSubject<psAuthUser> = new BehaviorSubject(<psAuthUser>{uid: null,name: null,email: null});
  authData$: Observable<psAuthUser> = this.__authData$.pipe(map(d=> d={ ... d, lic: this.__lic} ));;
  constructor(private __router:Router, private __fire:FireService) {
    this.__fire.auth.authState
    .subscribe(
      (d:AuthUser)=>{
        if (d) this.__authData$.next({uid: d.uid,name: d.displayName,email: d.email});
        else this.__authData$.next({uid: null,name: null,email: null});
      },
      e=>{ console.log('[fire.auth.authState] ERROR: ', e); }
    );
  }
  private __oauth(provider:AuthProvider) {
    this.__fire.auth.auth.signInWithPopup(provider)
    .catch(e=>{console.log('[fire.auth.auth.signInWithPopup] ERROR: ', e);});
  }
  login(opt:string){
    const oauthProviders={
      g: _=>{ return new this.__fire.base.auth.GoogleAuthProvider(); },
      f: _=>{ return new this.__fire.base.auth.FacebookAuthProvider(); },
      t: _=>{ return new this.__fire.base.auth.TwitterAuthProvider(); }
    };
    if (typeof oauthProviders[opt] === 'undefined') this.__oauth(new this.__fire.base.auth.GoogleAuthProvider());
    else this.__oauth(oauthProviders[opt]());
  }
  logout(){
    this.__fire.auth.auth.signOut();
  }
}
