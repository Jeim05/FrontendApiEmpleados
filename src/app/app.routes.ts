import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';

export const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "empleado/:id", component:EmpleadoComponent},
];
