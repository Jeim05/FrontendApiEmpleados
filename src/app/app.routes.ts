import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { GuardarDepartamentoComponent } from './components/guardar-departamento/guardar-departamento.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'inicio', component:HomeComponent},
  {path:'empleado/:id',component:EmpleadoComponent},
  {path: 'departamento', component:DepartamentoComponent},
  {path: 'departamento/:id',component:GuardarDepartamentoComponent}
];
