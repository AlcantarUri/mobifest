import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {


  path : string = 'https://randomuser.me/api/?results=25';
  private url : string = "http://avisositd.xyz/mobiliaria/ListaMobiliario.php";

  

  constructor(public http: HttpClient) {
  
  }
  getAll(): Observable<any>  {
    return this.http.get(this.url);
    //.map(res=>res.json());
  }
/*
private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error || "Error de Servidor");
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();

  }


*/



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


   
 /*
   sacarNombresMobiliarioBase(){
 
     //alert(usuario+contra);
    
    var url = 'http://avisositd.xyz/mobiliaria/ListaMobiliarioNombre.php';
    return new Promise((resolve, reject) => {
     this.http.get(url)
        .subscribe(data => {
          resolve(data);
         }, (err) =>{
           reject(err);
         });
    });
   }


 */

}
