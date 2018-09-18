import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Router } from '@angular/router';
import { FireService, AuthProvider } from './fire.service';
import { psAuthUser } from './interfaces';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  public readonly authData$: Observable<psAuthUser | null> = this.__fire.auth.authState.pipe(switchMap(d=>{
    if (!d) return of(null);
    return this.__fire.store.doc<psAuthUser | null>(`clients/${d.uid}`).valueChanges().pipe(switchMap(dd=>{
      if (!dd) {this.__fire.store.collection('clients').doc(d.uid).set({
        uid: d.uid,
        name: d.displayName,
        email: d.email,
        lic: null,
        store: null
      });}
      // TODO: check displayName and email changed
      
      return of(dd);
    }));
  }));
  constructor(private __router:Router, private __fire:FireService) {
    this.authData$.subscribe(x=>console.log('AUTH: ',x));
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
