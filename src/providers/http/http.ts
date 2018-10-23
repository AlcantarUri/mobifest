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
 
      console.log("llega al http");
     
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




}
