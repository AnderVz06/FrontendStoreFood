import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { PostCategoryComponent } from "./components/post-category/post-category.component";
import { FactoryComponent } from "./components/factory/factory.component";
import { LimitecrediteComponent } from "./components/limitecredite/limitecredite.component";


const routes: Routes = [
    {path: '', component: AdminComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'category', component: PostCategoryComponent},
    {path:'factory', component: FactoryComponent},
    {path:'credite', component: LimitecrediteComponent},
];
 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
 })
 export class AdminRoutingModule {}