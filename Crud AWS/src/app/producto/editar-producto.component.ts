import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto:Producto;
  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  //Cargar info del producto
  getData(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      (data:any)=>{
        this.producto = data.Item;
      },
      err =>{
        this.toaster.error(err.error.mensaje, 'Error',{
          timeOut:3000
        });
        this.router.navigate(['/']);
      }
    )
  }
    //Funcion de actualizar
    onUpdate():void{
      const id = parseInt(this.activatedRoute.snapshot.params.id);
      const update = {
        "id": id,
        "updateKey": "nombre",
        "updateValue": this.producto.nombre,
        "updateKey2": "cantidad",
        "updateValue2": this.producto.cantidad
      }
      
      this.productoService.update(update).subscribe(
        data => {
          this.toaster.success(data.Message, 'Exito',{
            timeOut:3000
          });
          this.router.navigate(['/'])
        },
        err => {
          this.toaster.error(err.error.mensaje, 'Error',{
            timeOut:3000
          });
          this.router.navigate(['/']);
        }
      )
    }
}
