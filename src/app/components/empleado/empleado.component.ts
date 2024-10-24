import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idEmpleado! : number;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado:FormGroup = this.formBuild.group({
    nombreCompleto:[""],
    idDepartamento:[1],
    sueldo:[0],
    fechaContrato:[""]
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.idEmpleado != 0){
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next:(data) =>{
          this.formEmpleado.patchValue({
            nombreCompleto: data.nombreCompleto,
            correo:data.idDepartamento,
            sueldo:data.sueldo,
            fechaContrato:data.fechaContrato
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }
}
