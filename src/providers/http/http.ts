import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { identifierModuleUrl } from '@angular/compiler';



/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

/*uri */
  path : string = 'https://randomuser.me/api/?results=25';
  private url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";

  

  constructor(public http: HttpClient) {
  
  }
  getAll(): Observable<any>  {
    return this.http.get(this.url);
    //.map(res=>res.json())
  }


insertarEvento(nombre_evento: string, 
  tipo_evento: string, 
  fecha_envio_evento: any, 
  hora_envio_evento: any,
  fecha_recoleccion_evento: any,
  hora_recoleccion_evento:any,
  pagado_evento: any, 
  nombre_titular_evento: string, 
  direccion:string,
  telefono_titular_evento:string,
 
  ){


  let datos = { nombre_evento:nombre_evento,
     tipo_evento:tipo_evento,
     fecha_envio_evento:fecha_envio_evento, 
     hora_envio_evento:hora_envio_evento, 
     fecha_recoleccion_evento:fecha_recoleccion_evento, 
     hora_recoleccion_evento:hora_recoleccion_evento,
     pagado_evento:pagado_evento,
     nombre_titular_evento:nombre_titular_evento,
     direccion:direccion,
     telefono_titular_evento:telefono_titular_evento
     
        }
  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/agregarEventos.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}

addPagosMetodoNuevo(costo_total:number, saldo: number, anticipo: number){

  let datos = { 
    costo_total:costo_total,
    saldo: saldo,
    anticipo: anticipo

        }
  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/uri/insertarPagos.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}

addInventorytoEvent(
  
  fecha_evento: any,
  hora_evento: any,
  id_mob: any,
  ocupados: any,
  id_evento: any,
  hora_recoleccion: any

  ){

  let datos = { 
    fecha_evento:fecha_evento,
    hora_evento: hora_evento,
  id_mob: id_mob,
  ocupados: ocupados,
  id_evento: id_evento,
  hora_recoleccion: hora_recoleccion

        }
  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/uri/agregarmobiliariodos.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}


obtenerEventosdelDia(fecha_envio_evento: string){
  var url ='http://avisositd.xyz/mobiliaria/eventodelDia.php?fecha_envio_evento='+fecha_envio_evento;
  return new Promise((resolve, reject)=>{
    this.http.get(url).subscribe(data =>{
      resolve(data);
    },(error)=>{
      reject(error);
    });
  });
}

dispoibilidadmob(
  fecha_evento:string,
  hora_evento:string,
  id_mob:number,
  ocupados:number,
  fecha_recoleccion_evento: string
  ){
  let datos = { 
    fecha_evento:fecha_evento,
  hora_evento:hora_evento,
id_mob:id_mob,
ocupados:ocupados,
fecha_recoleccion_evento:fecha_recoleccion_evento }
  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/disponibilidadEvento.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}

///mobiliaria/uri/eliminarEvento.php
borrarEvento(id_evento: number){
 
 
 var url = 'http://avisositd.xyz/mobiliaria/uri/eliminarEvento.php?id_evento='+id_evento;
 return new Promise((resolve, reject) => {
  this.http.get(url)
     .subscribe(data => {
       resolve(data);
      }, (err) =>{
        reject(err);
      });
 });
}

//actualizar observaciones

actualizarObservaciones(id_evento:string,observaciones:string){ 
  let datos = { 
    id_evento:id_evento,
    observaciones: observaciones
        }
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/uri/actualizarObservaciones.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}


borrarRemanentes(id_evento: string){
 
 
  var url = 'http://avisositd.xyz/mobiliaria/uri/eliminarPagosYMob.php?id_evento='+id_evento;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);
       });
  });
 }




insertarADisponibilidad(
  arreglo: any
  ){
  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/disponibilidadEvento.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(arreglo),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}





revisarDisponibilidadDia(fecha_envio_evento:string){

   
  var url = 'http://avisositd.xyz/mobiliaria/sumammobiliarioPrueba.php?fecha_envio_evento='+fecha_envio_evento;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);
       });
  });
 }


 yanosequehaceesta(fecha_envio_evento: string){
 
  //alert(usuario+contra);
 
 var url = 'http://avisositd.xyz/mobiliaria/sacarDisponiblesDelDia.php?fecha_envio_evento='+fecha_envio_evento;
 return new Promise((resolve, reject) => {
  this.http.get(url)
     .subscribe(data => {
       resolve(data);
      }, (err) =>{
        reject(err);
      });
 });
}

detallesdeleventodeldia(id_evento: string){

  var url = 'http://avisositd.xyz/mobiliaria/DetalleDelEventoDelDiaConItems.php?id_evento='+id_evento;
 return new Promise((resolve, reject) => {
  this.http.get(url)
     .subscribe(data => {
       resolve(data);
      }, (err) =>{
        reject(err);
      });
 });

}


sacarItemsporEventos(id_evento:string){

   
  var url = 'http://avisositd.xyz/mobiliaria/ItemsDelEventoDelDia.php?id_evento='+id_evento;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);
       });
  });
 }


 borraritemsdelEvento(id_evento:string, id_mob: string, costo_total: number){

   
  var url = 'http://avisositd.xyz/mobiliaria/uri/borrarmoviliario.php?id_evento='+id_evento+'&id_mob='+id_mob+'&costo_mob='+costo_total;
  return new Promise((resolve, reject) => {
   this.http.get(url)
      .subscribe(data => {
        resolve(data);
       }, (err) =>{
         reject(err);
       });
  });
 }

 borrrarItemsDelevento(id_evento:string, id_mob: string, costo_total: number, saldo:number){ 
  let datos = { 
    id_evento: id_evento,
    id_mob:id_mob,
    costo_total:costo_total,
    saldo: saldo,
    
        }
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/uri/borrarmoviliario2.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });
}


 //sacarCostoTotal.php

 sacarTotalCosto(id_evento:string){     
    var url = 'http://avisositd.xyz/mobiliaria/uri/sacarCostoTotal.php?id_evento='+id_evento;
    return new Promise((resolve, reject) => {
     this.http.get(url)
        .subscribe(data => {
          resolve(data);
         }, (err) =>{
           reject(err);
         });
    });
   }

   actualizarPagosacarTotalCosto(costo_total:number,saldo:number,id_evento:string){ 
      let datos = { 
        costo_total:costo_total,
        saldo: saldo,
        id_evento: id_evento
            }
           let options = {
             headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
            }
           };
           var url = 'http://avisositd.xyz/mobiliaria/uri/actualizarPago.php/';
            return new Promise(resolve => {
            this.http.post(url,JSON.stringify(datos),options)
              .subscribe(data => {
           resolve(data);
           });
             });
    }

    actualizarEvento(
      id_evento:string,
      nombre_evento: string, 
      tipo_evento: string, 
      fecha_envio_evento: any, 
      hora_envio_evento: any,
      fecha_recoleccion_evento: any,
      hora_recoleccion_evento:any,
      nombre_titular_evento: string, 
      direccion:string,
      telefono_titular_evento:string,
     
      ){
    
    
      let datos = { 
        id_evento:id_evento,
        nombre_evento:nombre_evento,
         tipo_evento:tipo_evento,
         fecha_envio_evento:fecha_envio_evento, 
         hora_envio_evento:hora_envio_evento, 
         fecha_recoleccion_evento:fecha_recoleccion_evento, 
         hora_recoleccion_evento:hora_recoleccion_evento,
         nombre_titular_evento:nombre_titular_evento,
         direccion:direccion,
         telefono_titular_evento:telefono_titular_evento
            }
      
           let options = {
             headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
            }
           };
           var url = 'http://avisositd.xyz/mobiliaria/uri/actualizarEventos.php/';
            return new Promise(resolve => {
            this.http.post(url,JSON.stringify(datos),options)
              .subscribe(data => {
           resolve(data);
           });
             });
    }
///////////////////////////Troca////////////////////////////////77

  loginApp(usuario:string, contra:string){

   
    var url = 'http://avisositd.xyz/mobiliaria/loginMobiliaira.php?usuario='+usuario;
    return new Promise((resolve, reject) => {
     this.http.get(url+'&contra='+contra)
        .subscribe(data => {
          resolve(data);
         }, (err) =>{
           reject(err);
         });
    });
   }
 
   revisarBase(){
 
     //alert(usuario+contra);
    
    var url = 'http://avisositd.xyz/mobiliaria/ListaMobiliario.php';
    return new Promise((resolve, reject) => {
     this.http.get(url)
        .subscribe(data => {
          resolve(data);
         }, (err) =>{
           reject(err);
         });
    });
   }


   
   sacarNombresMobiliarioBase(){

    // console.log("llega al http");
    
    var url = 'http://avisositd.xyz/mobiliaria/ListaMobiliarioNombre.php';
    return new Promise((resolve, reject) => {
     this.http.get(url)
        .subscribe(data => {
         // console.log(data);
          resolve(data);
         }, (err) =>{
           reject(err);
         });
    });
   }
 
   
 
 
   sacarDetalles(nombre_mob:string){
 
      console.log(nombre_mob);
     
     var url = 'http://avisositd.xyz/mobiliaria/detalles.php?nombre_mob='+nombre_mob;
     return new Promise((resolve, reject) => {
      this.http.get(url)
         .subscribe(data => {
 
     
 
          // console.log(data);
           resolve(data);
          }, (err) =>{
            reject(err);
          });
     });
    }


   
    insertarInventario(todo){

      let datos = { nombre:todo["nombre"],cantidad:todo["cantidad"], costo:todo["costo"],nombre_extra:todo["nombre_extra"], precio_extra:todo["precio_extra"]}
  
      console.log(todo["precio_extra"]);  
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/AgregarMobiliario.php/';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });

    }

    modificarInventario(id:string, nombre:string, cantidad:string, costo:string,nombre_exta:string, extra_costo:string){

      let datos = { id:id, nombre:nombre, cantidad:cantidad, costo:costo, nombre_extra:nombre_exta, precio_extra:extra_costo}
  
      console.log("Saliente      ");
      console.log(datos);
       let options = {
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
        }
       };
       var url = 'http://avisositd.xyz/mobiliaria/modificarInventario.php';
        return new Promise(resolve => {
        this.http.post(url,JSON.stringify(datos),options)
          .subscribe(data => {
       resolve(data);
       });
         });

    }


    revisarClientes(){
 
      //alert(usuario+contra);
     
     var url = 'http://avisositd.xyz/mobiliaria/ListaClientes.php';
     return new Promise((resolve, reject) => {
      this.http.get(url)
         .subscribe(data => {
           resolve(data);
          }, (err) =>{
            reject(err);
          });
     });
    }

    eliminarCliente(id:string){

      var url = 'http://avisositd.xyz/mobiliaria/eliminarCliente.php?id='+id;
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });
     }

     anadirCliente(nombre:string,telefono:string,correo:string){

      var url = 'http://avisositd.xyz/mobiliaria/agregarCliente.php?nombre='+nombre+'&telefono='+telefono+'&correo='+correo;
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });

     }

     editarCliente(nombre:string,telefono:string,correo:string, id:string){

      var url = 'http://avisositd.xyz/mobiliaria/editarCliente.php?nombre='+nombre+'&telefono='+telefono+'&correo='+correo+'&id='+id;
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });

     }


     revisarTrabajadores(){
 
      //alert(usuario+contra);
     
     var url = 'http://avisositd.xyz/mobiliaria/ListaTrabajadores.php';
     return new Promise((resolve, reject) => {
      this.http.get(url)
         .subscribe(data => {

           resolve(data);
          }, (err) =>{
            reject(err);
          });
     });
    }

    eliminarTrabajador(id:string){

      var url = 'http://avisositd.xyz/mobiliaria/eliminarTrabajador.php?id='+id;
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });
     }

     anadirUsuario(nombre:string,usuario:string,contrasena:string,correo:string,rol:string,fecha:string){
 
      var url = 'http://avisositd.xyz/mobiliaria/agregarUsuario.php?nombre='+nombre+'&usuario='+usuario+'&contrasena='+contrasena+'&corr='+correo+'&rol='+rol+'&fecha='+fecha;
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });

     }

     revisarSaldos(){

      var url = 'http://avisositd.xyz/mobiliaria/ListaPagos.php';
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
 
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });

     }


     ////////detalle pago/////////////////////////////////////////////////////////////////////////////7

     detallePago(id:string){

      
       var url = 'http://avisositd.xyz/mobiliaria/pagos/seguimientopago.php?id_evento='+id;
       console.log(url);
       
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
 
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });


    }

    abonarEvento(id:string, abono:string){

   
      var url = 'http://avisositd.xyz/mobiliaria/pagos/abonar.php?id='+id;
      return new Promise((resolve, reject) => {
       this.http.get(url+'&abono='+abono)
          .subscribe(data => {
            resolve(data);
           }, (err) =>{
             reject(err);
           });
      });
     }

     traerFechas(){

    
      var url = 'http://avisositd.xyz/mobiliaria/eventosTodos.php';  
      return new Promise((resolve, reject) => {
       this.http.get(url)
          .subscribe(data => {
            resolve(data);   
           }, (err) =>{
             reject(err);
           });
      });
  
     }


}
