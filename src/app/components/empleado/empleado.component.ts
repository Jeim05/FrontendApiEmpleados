import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idEmpleado!: number;
  private empleadoServicio = inject(EmpleadoService);
  public formBuild = inject(FormBuilder);

  public formEmpleado: FormGroup = this.formBuild.group({
    nombreCompleto: [''],
    departamento: this.formBuild.group({
      idDepartamento: [0],
      nombre:['']
    }),
    sueldo: [0],
    fechaContrato: ['']
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.idEmpleado != 0) {
      this.empleadoServicio.obtener(this.idEmpleado).subscribe({
        next: (data) => {
          this.formEmpleado.patchValue({
            nombreCompleto: data.nombreCompleto,
            departamento: {
              idDepartamento: data.departamento.idDepartamento,
              nombre: data.departamento.nombre
            },
            sueldo: data.sueldo,
            fechaContrato: data.fechaContrato
          })
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  guardar() {
    const objeto: Empleado = {
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.formEmpleado.value.nombreCompleto,
      departamento: {
        idDepartamento: this.formEmpleado.value.departamento.idDepartamento,
        nombre: this.formEmpleado.value.departamento.nombre
      },
      sueldo: this.formEmpleado.value.sueldo,
      fechaContrato: this.formEmpleado.value.fechaContrato
    };

    if (this.idEmpleado == 0) {
      this.empleadoServicio.crear(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/'])
          } else {
            alert("Error al crear empleado")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    } else {
      this.empleadoServicio.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/'])
          } else {
            alert("Error al editar empleado")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  volver() {
    this.router.navigate(['/'])
  }
}
