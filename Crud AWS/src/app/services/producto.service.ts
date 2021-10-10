import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoURL = 'https://cwbddyt3ia.execute-api.us-east-2.amazonaws.com/v1/';

  constructor(private httpClient:HttpClient) { }

  //Obtener lista
  public lista(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.productoURL + 'products');
  }

  //Obtener detalle
  public detail(id: number): Observable<Producto>{
    return this.httpClient.get<Producto>(this.productoURL + `product?id=${id}`);
  }

  //Obtener detalle por nombre
  //public detailName(nombre: string): Observable<Producto>{
    //return this.httpClient.get<Producto>(this.productoURL + `detailname/${nombre}`);
  //}

  //Crear producto
  public save(producto: Producto): Observable<any>{
    return this.httpClient.post<any>(this.productoURL + 'product', producto);
  }

  //Actualizar producto
  public update(producto: {}): Observable<any>{
    return this.httpClient.patch<any>(this.productoURL + `product`, producto);
  }

  //Borrar producto
  public delete(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.productoURL + `product?id=${id}`);
  }
}
