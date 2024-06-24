import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  order: any;

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(res => {
      console.log('Respuesta del servidor:', res); // Verificar la respuesta del servidor
      this.order = res;
      if (res && res.cartItems && res.cartItems.length > 0) {
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      } else {
        console.log('La propiedad cartItems no está presente en la respuesta del servidor o está vacía.');
        
      }
    });
  }
  
  
}
