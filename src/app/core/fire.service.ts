import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
// HINT: interim service for firebase libs
@Injectable({
  providedIn: CoreModule
})
export class FireService {
  public base=firebase;
  constructor(public auth:AngularFireAuth) { }
}
export interface AuthProvider extends firebase.auth.AuthProvider {}
export interface AuthUser extends firebase.User {}