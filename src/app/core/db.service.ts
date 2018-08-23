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
    d.sort((a:psStoredPlaylistItem,b:psStoredPlaylistItem)=>{
      return a.name.toString().localeCompare(b.name.toString());
    });
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
    else this.currentPlaylistSet(this.currentPlaylistGet());
    window.localStorage.setItem('storedPlaylists', JSON.stringify(this.storedPlaylists));
  }
  currentPlaylistGet(i?:string) {
    if (i==='index') return Number(window.localStorage.getItem('currentPlaylistIdx'));
    else return window.localStorage.getItem('currentPlaylist');
  }
  currentPlaylistSet(n:string | number){
    if (n!==null) {
      this.storedPlaylists.forEach((d,i)=>{ if(d.listname===n) {
        this.currentPlaylist$.next(d.list);
        window.localStorage.setItem('currentPlaylistIdx',i.toString());
      }});
      window.localStorage.setItem('currentPlaylist',n.toString());
    }
  }
  currentPlaylistSw(n:string){
    this.currentPlaylistSet(n);
    this.__router.navigate(['/']);
  }
  currentPlaylistUpd(o:psStoredPlaylist){
    this.currentPlaylist$.next(o.list);
    this.storedPlaylists[this.currentPlaylistGet('index')]=o;
    window.localStorage.setItem('storedPlaylists', JSON.stringify(this.storedPlaylists));
  }
  favPlaylistItem(i:number,f:boolean){
    let curList=this.storedPlaylists[this.currentPlaylistGet('index')];
    curList.list[i].fav=f;
    curList.list.sort((a:psStoredPlaylistItem,b:psStoredPlaylistItem)=>{
      if (a.fav &&  b.fav) {return a.name.toString().localeCompare(b.name.toString());
      } else {
        if (!a.fav && !b.fav){return a.name.toString().localeCompare(b.name.toString());
        } else { return (a.fav)? -1:1; }
      }
    });
    this.currentPlaylistUpd(curList);
  }
}
