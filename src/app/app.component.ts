import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';


@Component({
  selector: 'ps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private __afAuth:AuthService){}
}
