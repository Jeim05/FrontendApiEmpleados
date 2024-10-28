import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DepartamentoService } from '../../Services/departamento.service';
import { Departamento } from '../../Models/Departamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent {
  faPenToSquare = faPenToSquare; 
  faTrashCan = faTrashCan;

  private departamentoService = inject(DepartamentoService);
  public listaDepartamentos: Departamento[] = [];

  constructor(private router:Router){
    this.obtenerDepartamentos();
  }

  obtenerDepartamentos(){
    this.departamentoService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaDepartamentos = data;
        }
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  nuevo(){
    this.router.navigate(["/departamento",0])
  }

  editar(objeto:Departamento){
    this.router.navigate(["/departamento",objeto.idDepartamento])
  }

  eliminar(objeto:Departamento){
    if (confirm("¿Desea Eliminar el departamento "+objeto.nombre +"?")){
      
    }
  }

}
