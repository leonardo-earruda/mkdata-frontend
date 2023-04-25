import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersComponent} from './pages/customers/customers.component';
import {CustomerFormComponent} from './components/customer-form/customer-form.component';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerRoutingModule} from "./customer-routing.module";
import {EnumToString} from "./pipes/enumToString.pipe";

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
    EnumToString
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ],

})
export class CustomerModule {
}
