import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { CartComponent } from './components/products/cart/cart.component';
import { CreditComponent } from './components/products/credit/credit.component';
import { PaymentPlanComponent } from './components/products/payment-plan/payment-plan.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';




@NgModule({
  declarations: [
    CustomerComponent,
    ProductsComponent,
    CartComponent,
    CreditComponent,
    PaymentPlanComponent
    
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule

  
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }

