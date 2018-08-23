import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { DbService } from '../core/db.service';

@Component({
  selector: 'ps-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  card = { cols: 1, rows: 1 , num: 3};
  // dummy=this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       this.card.num = 1;
  //     } else this.card.num = 3;
  //   })
  // );
  constructor(private breakpointObserver: BreakpointObserver, public db: DbService) {}
  // TODO: Preview button and tile
}
