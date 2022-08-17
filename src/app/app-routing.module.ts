import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditComponent } from './components/edit-page/edit/edit.component';
import { SpotifyTestComponent } from './components/test/spotify-test/spotify-test.component';
import { FuncButtonComponent } from './components/test/func-button/func-button.component';

const routes: Routes = [
  { path: '', redirectTo: '/edit', pathMatch: 'full' },
  { path: 'edit', component: EditComponent },
  { path: 'test', component: FuncButtonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
