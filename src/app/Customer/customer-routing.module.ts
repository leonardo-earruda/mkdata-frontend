import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CustomersComponent} from "./pages/customers/customers.component";

const routes: Routes = [
  {
    path: 'all',
    component: CustomersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CustomerRoutingModule {
}
