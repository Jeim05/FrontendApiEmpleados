import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appsettings';
import { Observable } from 'rxjs';
import { Departamento } from '../Models/Departamento';
import { ResponseApi } from '../Models/ResponsaApi';

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

  obtener(id:number){
    return this.http.get<Departamento>(this.apiUrl);
  }

  crear(objeto:Departamento){
    return this.http.post<ResponseApi>(this.apiUrl,objeto);
  }

  editar(objeto:Departamento){
    return this.http.put<ResponseApi>(this.apiUrl,objeto);
  }

  eliminar(id:number){
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }


}
