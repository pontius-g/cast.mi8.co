import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { LoadPlaylistComponent } from './load-playlist/load-playlist.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path: "", component: MainDashboardComponent },
  {path: "loadPlaylist", component: LoadPlaylistComponent },
  {path: "auth", component: AuthComponent},
  {path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
