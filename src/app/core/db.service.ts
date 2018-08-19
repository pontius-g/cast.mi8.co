import { Injectable, Input } from '@angular/core';
import { CoreModule } from './core.module';
import { BehaviorSubject } from 'rxjs';
import { psStoredPlaylistItem, psStoredPlaylist } from './interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: CoreModule
})
export class DbService {
  currentPlaylist$=new BehaviorSubject([]);
  storedPlaylists:Array<psStoredPlaylist>=[];
  constructor(private __router:Router) {
    // TODO: For PAID-Clients check in cloud storage
    // ...
    // Check at local storage
    let temp:string;
    if (temp=window.localStorage.getItem('storedPlaylists')) {
      this.storedPlaylists=JSON.parse(temp);
      this.currentPlaylist=this.currentPlaylist;
    } else this.__router.navigate(['/loadPlaylist']);
  }
  addPlaylist(d:Array<psStoredPlaylistItem>, n:string){
    let existed: boolean=false;
    this.storedPlaylists.forEach((dd, i, a)=>{
      if (dd.listname===n) {a[i].list=d; existed=true;}
    });
    if (!existed) this.storedPlaylists.push({ list: d, listname: n });
    console.log(JSON.stringify(this.storedPlaylists));
    window.localStorage.setItem('storedPlaylists', JSON.stringify(this.storedPlaylists));
  }
  get currentPlaylist():string {
    return window.localStorage.getItem('currentPlaylist');
  }
  set currentPlaylist(n:string){
    console.log('setting current playlist');
    if (n!==null) {
      this.storedPlaylists.forEach(d=>{ if(d.listname===n) this.currentPlaylist$.next(d.list); });
      window.localStorage.setItem('currentPlaylist',n);
    }
  }
}
