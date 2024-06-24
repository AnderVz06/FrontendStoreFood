import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service'

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent {

  typeOptions = [
    { value: 'credito dominal', label: 'dominal' },
    { value: 'credito efectivo', label: 'efectiva' }
  ];

  typeOptions1 = [
    { value: 'moneda soles', label: 'soles' },
    { value: 'moneda dolares', label: 'dolares' }
  ];

  paymentPeriodOptions = [
    { value: 'monthly', label: 'Mensual' },
    { value: 'bimonthly', label: 'Bimestral' },
    { value: 'semi-monthly', label: 'Quincenal' },
    { value: 'yearly', label: 'Anual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'quadrimestral', label: 'Cuatrimestral' },
    { value: 'semester', label: 'Semestral' },
    { value: 'daily', label: 'Diaria' },
  ];




  creditForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private customerService:CustomerService

  ){}

  ngOnInit(): void{
    this.creditForm= this.fb.group({
      typeCurrency: [null, [Validators.required]],
      typeRateInterest:[null,[Validators.required]],
      typePeriodRate:[null,[Validators.required]],
      rateInterest:[null,[Validators.required]],
      initialFee:[null,[Validators.required]],
      timeLoan:[null,[Validators.required]],
      
   





    })
  }

  addCredit():void{
    if(this.creditForm.valid){
      this.customerService.addCredit(this.creditForm.value).subscribe((res) =>{
        if(res.id != null){
          this.snackBar.open('Credit Posted Successfully!', 'Close',{
            duration: 5000
          });
          this.router.navigateByUrl('/customer/payment');
        }else {
          this.snackBar.open(res.message,'Close', {
            duration: 5000,
            panelClass : 'error-snackbar'
          });
        }
      })

    }else{
      this.creditForm.markAllAsTouched();
      this.snackBar.open('Credit Posted Error!', 'Close',{
        duration: 5000
      });

    }
  }

}
