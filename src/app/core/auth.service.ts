import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Router } from '@angular/router';
import { FireService, AuthProvider, AuthUser } from './fire.service';
import { psAuthUser } from './interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  // private __lic:psAuthLicense | null;
  // private __authData$: BehaviorSubject<psAuthUser> = new BehaviorSubject(<psAuthUser>{uid: null,name: null,email: null});
  // authData$: Observable<psAuthUser> = this.__authData$.pipe(map(d=> d={ ... d, lic: this.__lic} ));
  public readonly authData$: Observable<psAuthUser | null> = this.__fire.auth.authState.pipe(switchMap(d=>{
    if (!d)
    return of(null);
    // return of({uid: null,name: null,email: null,lic: null}) as Observable<psAuthUser>;
    return this.__fire.store.doc<psAuthUser | null>(`clients/${d.uid}`).valueChanges().pipe(switchMap(dd=>{
      if (!dd) {
        let newClient:psAuthUser = {
          uid: d.uid,
          name: d.displayName,
          email: d.email,
          lic: null
        };
        this.__fire.store.collection('clients').doc(d.uid).set(newClient);
        return of(newClient);
      }
      // TODO: check displayName and email changed
      return of(dd);
    }));
  }));
  constructor(private __router:Router, private __fire:FireService) {
    // this.__fire.auth.authState
    // .subscribe(
    //   (d:AuthUser)=>{
    //     // if (d) this.__authData$.next({uid: d.uid,name: d.displayName,email: d.email});
    //     // else this.__authData$.next({uid: null,name: null,email: null});
    //     if (!!d) {
          
    //     } else {

    //     }
    //   },
    //   e=>{ console.log('[fire.auth.authState] ERROR: ', e); }
    // );
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
