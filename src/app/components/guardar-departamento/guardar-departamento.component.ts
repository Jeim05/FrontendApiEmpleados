import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentoService } from '../../Services/departamento.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-guardar-departamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './guardar-departamento.component.html',
  styleUrl: './guardar-departamento.component.css'
})
export class GuardarDepartamentoComponent implements OnInit{
  @Input('id') idDepartamento!: number;
  private departamentoService = inject(DepartamentoService);
  public formBuild = inject(FormBuilder);

  public formDepartamento: FormGroup= this.formBuild.group({
    idDepartamento: [0],
    nombre: ['']
  })

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }
}
