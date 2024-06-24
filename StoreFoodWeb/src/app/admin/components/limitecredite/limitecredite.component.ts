import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';

@Component({
  selector: 'app-limitecredite',
  templateUrl: './limitecredite.component.html',
  styleUrls: ['./limitecredite.component.scss']
})
export class LimitecrediteComponent implements OnInit {
  creditForm: FormGroup;
  userId:number
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit() {
     this.userId = UserStorageService.getUserId(); // Obtener el userId desde el servicio
  
    this.creditForm = this.fb.group({
      userId: [this.userId, Validators.required], // Asignar el userId al formulario
      tipoMoneda: ['', Validators.required],
      tipoTasaInteres: ['', Validators.required],
      tipoCapitalizacion: ['', Validators.required],
      tasaAnual: [null, Validators.required],
      cuotas: [null, Validators.required],
      tiempoCredito: [null, Validators.required],
      pagoInicial: [null, Validators.required],
      montoFinanciar: [null, Validators.required],
      credito: [false],
      tasaMoratoria: [null, Validators.required],
      limiteCredito: [null, Validators.required],
      fechaPagoMensual: [, Validators.required],
      conPlazoGracia: [false],
      tipoPlazoGracia: [''],
      tiempoPlazoGracia: [null],
      mesesInicio: [null],
      fechaFinalMes: [null]
    });

    this.onChanges(); // Si tienes lógica adicional en onChanges()
  }


  onChanges(): void {
    this.creditForm.get('conPlazoGracia').valueChanges.subscribe(val => {
      if (val) {
        this.creditForm.get('tipoPlazoGracia').setValidators([Validators.required]);
        this.creditForm.get('mesesInicio').setValidators([Validators.required]);
        this.creditForm.get('fechaFinalMes').setValidators([Validators.required]);
      } else {
        this.creditForm.get('tipoPlazoGracia').clearValidators();
        this.creditForm.get('mesesInicio').clearValidators();
        this.creditForm.get('fechaFinalMes').clearValidators();
      }
      this.creditForm.get('tipoPlazoGracia').updateValueAndValidity();
      this.creditForm.get('mesesInicio').updateValueAndValidity();
      this.creditForm.get('fechaFinalMes').updateValueAndValidity();
    });
  }


  onSubmit(): void {
    if (this.creditForm.valid) {
      const creditData = this.creditForm.value;

      this.adminService.addCredito(creditData).subscribe(
        (res) =>{
          if(res.id != null){
            this.snackBar.open('Category Posted Successfully!', 'Close',{
              duration: 5000
            });
            this.router.navigateByUrl('/admin/products');
          }else {
            this.snackBar.open(res.message,'Close', {
              duration: 5000,
              panelClass : 'error-snackbar'
            });
          }
        }
      );
    } else {
      for (const i in this.creditForm.controls) {
        this.creditForm.controls[i].markAsDirty();
        this.creditForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
