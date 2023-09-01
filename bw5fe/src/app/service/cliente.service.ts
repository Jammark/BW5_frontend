import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  private postSubj = new BehaviorSubject<null|Cliente>(null);
  post$ = this.postSubj.asObservable();

  constructor(private http: HttpClient) { }

  getClienti():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.baseURL}cliente`);
  }

getCliente(id:number):Observable<Cliente>{
  return this.http.get<Cliente>(`${environment.baseURL}cliente/${id}`);
}

  register(item:Cliente):void{
    this.postSubj.next(item);
  }

  deregister():void{
    this.postSubj.next(null);
  }

  send(item: Cliente):Observable<boolean>{
    return this.http.post<boolean>(`${environment.baseURL}cliente`, item);
  }

  update(item:Cliente):Observable<boolean>{
    return this.http.put<boolean>(`${environment.baseURL}cliente/${item.id}`, item);
  }

  rimuovi(item:Cliente):Observable<boolean>{
    return this.http.delete<boolean>(`${environment.baseURL}cliente/${item.id}`);
  }
}
