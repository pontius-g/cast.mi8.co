import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { DbService } from '../core/db.service';
import { CastService } from '../core/cast.service';

@Component({
  selector: 'ps-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  card = { cols: 1, rows: 1 , num: 2};
  // dummy=this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       this.card= { cols: 1, rows: 1 , num: 1 };
  //     } else this.card={ cols: 1, rows: 1 , num: 3};
  //   })
  // );
  mediaPath: string = null;
  previewMuted: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver, public db: DbService, public cast: CastService) {}
  // TODO: Preview button and tile
}
