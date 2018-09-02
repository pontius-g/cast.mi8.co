import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { Subject } from 'rxjs';
declare const cast:any;
declare const chrome:any;
@Injectable({
  providedIn: CoreModule
})
export class CastService {
  playStream:Subject<string>=new Subject();
  currentMediaURL:string;
  contentType:string;
  constructor() {
    window['__onGCastApiAvailable'] = (canCast)=>{
      if(canCast){
        cast.framework.CastContext.getInstance().setOptions({
          receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
      }
    }
    this.playStream.subscribe(d=>{
      this.contentType='LIVE';
      this.currentMediaURL=d;
      if (this.castSession!==null){
        this.castSession.loadMedia(this.request).then(_=>{
          console.log('Load succeed');
        }, e=>{
          console.log('Error sending request to Chromecast: ', e);
          //TODO: add fallback to previous stream
        })        
      }
    },
    e=>{ console.log('playStream subscription error: ', e); });
  }
  get castSession() {return cast.framework.CastContext.getInstance().getCurrentSession();}
  get mediaInfo() { return new chrome.cast.media.MediaInfo(this.currentMediaURL, this.contentType); }
  get request() { return new chrome.cast.media.LoadRequest(this.mediaInfo); }
}
