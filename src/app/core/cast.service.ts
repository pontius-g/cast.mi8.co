import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
declare const cast:any;
declare const chrome:any;
@Injectable({
  providedIn: CoreModule
})
export class CastService {
  constructor() {
    window['__onGCastApiAvailable'] = (canCast)=>{
      if(canCast){
        cast.framework.CastContext.getInstance().setOptions({
          receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
      }
    }
  }
}
