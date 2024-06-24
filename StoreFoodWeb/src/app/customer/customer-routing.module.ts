import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { CartComponent } from "./components/products/cart/cart.component";
import { CreditComponent } from "./components/products/credit/credit.component";
import { PaymentPlanComponent } from "./components/products/payment-plan/payment-plan.component";


const routes: Routes = [
    {path: '', component: CustomerComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'cart', component: CartComponent},
    {path:'credit', component:CreditComponent},
    {path:'payment', component:PaymentPlanComponent}
];
 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
 })
 export class CustomerRoutingModule {}

