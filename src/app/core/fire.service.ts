import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: CoreModule
})
export class FireService {
  public base=firebase;
  constructor(public auth:AngularFireAuth) { }
}
// HINT: interim service for firebase db connection