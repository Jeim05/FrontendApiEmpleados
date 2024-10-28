import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appsettings';
import { Observable } from 'rxjs';
import { Departamento } from '../Models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl+"Departamento";

  constructor() { }

  lista():Observable<any>{
    return this.http.get<Departamento>(this.apiUrl);
  }
}
