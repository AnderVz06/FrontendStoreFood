import { Component } from '@angular/core';
import { AdminComponent } from '../../admin.component';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  factorys:any[]=[];
  searchFactoryForm!: FormGroup;
  constructor(
    private adminService:AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}
  ngOnInit(){
    this.getAllFactorys();
    this.searchFactoryForm=this.fb.group({
      title: [null, [Validators.required]]
    })
  }
  getAllFactorys(){

    this.factorys=[];
    this.adminService.getAllFactory().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:/image/jpeg;base64,' + element.byteImg;
        this.factorys.push(element);
      });
      console.log(this.factorys)
    })

  }
  submitForm(){

    this.factorys=[];
    const  title = this.searchFactoryForm.get('title')!.value;
    this.adminService.getAllFactoryByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:/image/jpeg;base64,' + element.byteImg;
        this.factorys.push(element);
      });
      console.log(this.factorys)
    })



  }
  deleteFactory(factoryId:any){
    this.adminService.deleteFactory(factoryId).subscribe(res => {
      if(res.body == null){
        this.snackBar.open('Product Deleted Successfully', 'close',{
          duration: 5000
        });
        this.getAllFactorys();
      }else{
        this.snackBar.open(res.message, 'Close',{
          duration : 5000,
          panelClass: 'error-snackbar'
        })
      }
    })
  }




}
