import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent {
  factoryForm: FormGroup;
  listOfCategories: any=[];
  selectedFile: File |null;
  imagePreview: string | ArrayBuffer | null;

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService

  ){}

  async ngOnInit():Promise <void>{

  
    this.factoryForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null,[Validators.required]],
      price: [null,[Validators.required]],
      description:[null,[Validators.required]],
  
    });
  
    await this.getAllCategories();
   }

  OnFileSelected(event: any){
  this.selectedFile= event.target.files[0];
  this.previewImage();
 }

 previewImage(){
  const reader = new FileReader();
  reader.onload= () => {
    this.imagePreview = reader.result;
  }
  reader.readAsDataURL(this.selectedFile);

 }


 async getAllCategories(): Promise<void> {
  try {
    const categories = await this.adminService.getAllCategories().toPromise();
    this.listOfCategories = categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}


 addFactory(): void {
  if(this.factoryForm.valid){
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('categoryId', this.factoryForm.get('categoryId').value);
    formData.append('name', this.factoryForm.get('name').value);
    formData.append('description', this.factoryForm.get('description').value);
    formData.append('price', this.factoryForm.get('price').value);

    this.adminService.addFactory(formData).subscribe((res) =>{
      if(res.id != null){
        this.snackBar.open('Product Posted Successfully!', 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('/admin/products');
      }else{
        this.snackBar.open(res.message, 'ERROR',{
          duration : 5000
        });
      }
    })
  }else {
    for(const i in this.factoryForm.controls){
      this.factoryForm.controls[i].markAsDirty();
      this.factoryForm.controls[i].updateValueAndValidity();

    }
  }
   
 }



}
