import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbService } from '../core/db.service';

@Component({
  selector: 'ps-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver, public db:DbService) {}
  
  ngOnInit() {
    window['__onGCastApiAvailable'] = (canCast)=>{
      if(canCast){
        cast.framework.CastContext.getInstance().setOptions({
          receiverApplicationId: applicationId,
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        });
      }
    }
  }

  }
