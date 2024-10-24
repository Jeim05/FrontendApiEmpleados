import { Component, inject } from '@angular/core';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faPenToSquare = faPenToSquare; 
  faTrashCan = faTrashCan;
  private empleadoService = inject(EmpleadoService);
  public listaEmpleados: Empleado[] = [];

  constructor(private router:Router){
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaEmpleados = data;
        }
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  nuevo(){
    this.router.navigate(['/empleado',0]);
  }

  editar(objeto:Empleado){
    this.router.navigate(['/empleado',objeto.idEmpleado])
  }

  eliminar(objeto:Empleado){
    if (confirm("Desea Eliminar el empleado"+objeto.nombreCompleto)) {
      this.empleadoService.eliminar(objeto.idEmpleado).subscribe({
        next: (data) => {
          if (data.isSuccess) {
            this.obtenerEmpleados();
          }else{
            alert("No se pudo eliminar el empleado")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }
}
