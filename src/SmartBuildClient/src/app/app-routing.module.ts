import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './_layout/content/content.component';


const routes: Routes = [
  {
    path: '', component: ContentComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
