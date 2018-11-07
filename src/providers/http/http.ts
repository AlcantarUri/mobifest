import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';



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
  costo_total: number,
  anticipo: number,
  saldo: number){

  let datos = { nombre_evento:nombre_evento,
     tipo_evento:tipo_evento,
     fecha_envio_evento:fecha_envio_evento, 
     hora_envio_evento:hora_envio_evento, 
     fecha_recoleccion_evento:fecha_recoleccion_evento, 
     hora_recoleccion_evento:hora_recoleccion_evento,
     pagado_evento:pagado_evento,
     nombre_titular_evento:nombre_titular_evento,
     direccion:direccion,
     costo_total:costo_total,
     anticipo:anticipo,
     saldo:saldo   }
  
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
 
      //console.log("llega al http");
     
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



  

}
