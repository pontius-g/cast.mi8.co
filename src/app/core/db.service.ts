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
      this.currentPlaylistSet(this.currentPlaylistGet());
    } else this.__router.navigate(['/loadPlaylist']);
  }
  dashboardUpd(o?:psStoredPlaylist){
    if (typeof o === 'undefined') {
      window.localStorage.removeItem('currentPlaylist');
      this.currentPlaylist$.next([]);
    } else {
      this.currentPlaylistSet(o.listname);
    }
  }
  addPlaylist(d:Array<psStoredPlaylistItem>, n:string){
    let existed: boolean=false;
    this.storedPlaylists.forEach((dd, i, a)=>{
      if (dd.listname===n) {a[i].list=d; existed=true;}
    });
    if (!existed) this.storedPlaylists.push({ list: d, listname: n });
    window.localStorage.setItem('storedPlaylists', JSON.stringify(this.storedPlaylists));
    this.currentPlaylistSet(n);
    this.__router.navigate(['/']);
  }
  delPlaylist(n:string){
    this.storedPlaylists.forEach((d,i,a)=>{if (d.listname===n) a.splice(i,1);});
    if (this.currentPlaylistGet()===n) this.dashboardUpd(this.storedPlaylists[0]);
    window.localStorage.setItem('storedPlaylists', JSON.stringify(this.storedPlaylists));
  }
  currentPlaylistGet():string {return window.localStorage.getItem('currentPlaylist');}
  currentPlaylistSet(n:string){
    if (n!==null) {
      this.storedPlaylists.forEach(d=>{ if(d.listname===n) this.currentPlaylist$.next(d.list); });
      window.localStorage.setItem('currentPlaylist',n);
    }
  }
  currentPlaylistSw(n:string){
    this.currentPlaylistSet(n);
    this.__router.navigate(['/']);
  }
}
