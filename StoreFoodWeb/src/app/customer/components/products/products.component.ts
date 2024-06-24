import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent {
  // Variable para controlar el número de factorys que se mostrarán inicialmente
  panelOpenState = false;

  counter : number =0;
  factorys:any[]=[];
  searchFactoryForm!: FormGroup;
  constructor(
    private customerService:CustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
    
  ){}
  ngOnInit(){
    this.getAllFactorys();
    this.searchFactoryForm=this.fb.group({
      title: [null, [Validators.required]]
    })
  }

filterFactories():any[]{
  if(this.counter > 4){
  return this.factorys.filter(factory => factory.id );
  }
  else{
  return  this.factorys.filter(factory => factory.id);
  }
  
}

  getAllFactorys(){

    this.factorys=[];
    this.customerService.getAllFactory().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:/image/jpeg;base64,' + element.byteImg;
        this.factorys.push(element);
        this.counter++;
      });
      console.log(this.factorys)
    })

  }
  submitForm(){

    this.factorys=[];
    const  title = this.searchFactoryForm.get('title')!.value;
    this.customerService.getAllFactoryByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:/image/jpeg;base64,' + element.byteImg;
        this.factorys.push(element);
      });
      console.log(this.factorys)
    })



  }

  addToCart(id:any){
   
    this.customerService.addToCart(id).subscribe(res => {
      this.snackBar.open("Product added to cat successfully", "close",{duration: 5000})
    })
    

  }

}
