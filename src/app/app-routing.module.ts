import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ListingsPageComponent } from './listings-page/listings-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/listings',
    pathMatch: 'full'
  },
  {
    path: 'listings',
    component: ListingsPageComponent,
  },
  {
    path: 'details/:id',
    component: DetailsPageComponent,
  },
  {
    path: 'edit/:id',
    component: EditPageComponent,
  },
  {
    path: 'add',
    component: AddPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
