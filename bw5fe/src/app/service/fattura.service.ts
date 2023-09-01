import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foto } from '../model/foto';
import { Cliente } from '../model/cliente';
import { Fattura } from '../model/fattura';
import { DateUtil } from '../util/date-util';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  private aSubj = new BehaviorSubject<null|Cliente>(null);
  cliente$ = this.aSubj.asObservable();
  private fotoSubj = new BehaviorSubject<null|Fattura>(null);
  fattura$ = this.fotoSubj.asObservable();

  constructor(private http: HttpClient) { }

  getAllFatture():Observable<Fattura[]>{
    return this.http.get<Fattura[]>(`${environment.baseURL}fattura`);
  }

  getFattura(id:number):Observable<Fattura>{
    return this.http.get<Fattura>(`${environment.baseURL}fattura/${id}`)
  }

  getFatture(id:number):Observable<Fattura[]>{
    return this.http.get<Fattura[]>(`${environment.baseURL}fattura/search/${id}`);
  }

  cercaFatture(f:Partial<Fattura>, min?: number, max?:number):Observable<Fattura[]>{
    let url = new URL(`${environment.baseURL}fattura/search/${f.clienteId}`);
    if(f.anno){
      url.searchParams.append('anno', `${f.anno}`);
    }
    if(f.stato){
      url.searchParams.append('stato', `${f.stato}`);
    }
    if(f.data){
      url.searchParams.append('data', f.data);
    }
    if(min && max){
      url.searchParams.append('min', `${min}`);
      url.searchParams.append('max', `${max}`);
    }

    return this.http.get<Fattura[]>(url.toString());
  }

  updateFattura(item:Fattura):Observable<boolean>{
    return this.http.put<boolean>(`${environment.baseURL}fattura/${item.id}`, item);
  }

  addFattura(item:Partial<Fattura>):Observable<boolean>{
    return this.http.post<boolean>(`${environment.baseURL}fattura`, item);
  }

  cancellaFattura(item:Fattura):Observable<boolean>{
    return this.http.delete<boolean>(`${environment.baseURL}fattura/${item.id}`);
  }

  registraCliente(item:Cliente):void{
    this.aSubj.next(item);
  }
  deregistraCliente(){
    this.aSubj.next(null);
  }
  registraFattura(item:Fattura){
    this.fotoSubj.next(item);
  }
  deregistraFattura(){
    this.fotoSubj.next(null);
  }
}
