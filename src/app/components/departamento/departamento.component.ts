import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DepartamentoService } from '../../Services/departamento.service';
import { Departamento } from '../../Models/Departamento';

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

  constructor(){
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

  }

  editar(){}

  eliminar(){}

}
