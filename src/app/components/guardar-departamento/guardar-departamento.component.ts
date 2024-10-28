import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentoService } from '../../Services/departamento.service';
import { Router } from '@angular/router';
import { Departamento } from '../../Models/Departamento';


@Component({
  selector: 'app-guardar-departamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './guardar-departamento.component.html',
  styleUrl: './guardar-departamento.component.css'
})
export class GuardarDepartamentoComponent implements OnInit {
  @Input('id') idDepartamento!: number;
  private departamentoService = inject(DepartamentoService);
  public formBuild = inject(FormBuilder);

  public formDepartamento: FormGroup = this.formBuild.group({
    idDepartamento: [0],
    nombre: ['']
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.idDepartamento != 0) {
      this.departamentoService.obtener(this.idDepartamento).subscribe({
        next: (data) => {
          this.formDepartamento.patchValue({
            nombre: data.nombre
          })
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  guardar() {
    const objeto: Departamento = {
      idDepartamento: this.idDepartamento,
      nombre: this.formDepartamento.value.nombre
    }

    if (this.idDepartamento == 0) {
      this.departamentoService.crear(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/departamento'])
            alert("Guardado con exito")
          } else {
            alert("Error al crear departamento")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    } else {
      this.departamentoService.editar(objeto).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.router.navigate(['/departamento'])
            alert("Guardado con exito")
          } else {
            alert("Error al editar departamento")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  volver() {
    this.router.navigate(['/departamento'])
  }
}
