import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {

  id: number;
  nombre = '';
  cantidad: number;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


//Crear producto
  onCreate(): void{
    const producto = new Producto(this.id, this.nombre, this.cantidad);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success(data.Message, 'Exito',{
          timeOut:3000
        });
        this.router.navigate(['/']);
      },
      err =>{
        console.log(err);
        console.log(producto);
        this.toastr.error(err.error.Message, 'Error',{
          timeOut:3000
        });
        this.router.navigate(['/nuevo']);
      }
    )
  }
}
