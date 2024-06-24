import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterialModule } from '../DemoAngularMaterialModule';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { FactoryComponent } from './components/factory/factory.component';
import { LimitecrediteComponent } from './components/limitecredite/limitecredite.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    AdminComponent,
    ProductsComponent,
    PostCategoryComponent,
    FactoryComponent,
    LimitecrediteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoAngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, 
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  

  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
