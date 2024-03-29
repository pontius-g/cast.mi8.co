import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
// HINT: interim service for firebase libs
@Injectable({
  providedIn: CoreModule
})
export class FireService {
  public readonly base=firebase;
  constructor(public readonly auth:AngularFireAuth, public readonly store:AngularFirestore) {}
}
export interface AuthProvider extends firebase.auth.AuthProvider {}
export interface AuthUser extends firebase.User {}