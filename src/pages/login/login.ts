import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuario:string;
  contra:string;
  resultado: any[];
  someString: any;
  public recuerda: boolean;
  respuesta:string;
  id:any;
  guard:any;
 

  mobiliarioPage = TabsPage;



  /////Prueba Json
  public items:any;

  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, public http: HttpProvider, public storage: Storage) {

    
    
    
    
    this.storage.get('USU').then((usu) =>{
      console.log("Usuario"+usu);
      this.usuario = usu;
    });

    this.storage.get('PASS').then((pass) =>{
      console.log("Contrasena"+pass);
      this.contra = pass;
    });

    this.storage.get('NUM').then((num) =>{
      console.log(num);

      var guardado = num;

    if(guardado != 0){
      this.inicioSesion(this.usuario,this.contra);
    }
    
     
    });

   
    

    
  }

  ionViewDidLoad() {
    

  }


  

  public notify() {
    console.log("Recuerdame es: "+ this.recuerda);
    //alert(this.recuerda);
  }


  someFunction(event: Event) {

   
  let loading = this.loadingCtrl.create({
    content: 'Iniciando Sesion...'
  });

  loading.present();

    event.stopPropagation();

    if(this.recuerda == true){
      this.storage.set('USU',this.usuario);
      this.storage.set('PASS',this.contra);
      this.storage.set('NUM', 1);
      console.log("Guardaste"+this.usuario+this.contra);
    }else{
      console.log("No vas a guardar DATOS");
    }

   
    
    this.http.loginApp(this.usuario,this.contra).then(
      (data) => { 
        console.log(data)  


        var result = data["Usuario"];
        this.id = result["id_usuario"];

        //console.log("Result"+result);
        console.log("ID:  "+this.id);

        if(this.id != 0){
          loading.dismiss();
          this.navCtrl.push(TabsPage, {
            data: this.id
          });
        }else{
          alert("Los Datos no Coinciden")
          loading.dismiss();
        }
               
          
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

   // alert("Usuario:"+this.usuario+"       Contraseña:"+this.contra);
}

inicioSesion(usuario:string, contra:string){
  let loading = this.loadingCtrl.create({
    content: 'Iniciando Sesion...'
  });
  loading.present();

 // console.log(usuario+contra);
  this.http.loginApp(usuario,contra).then(
    (data) => { 
      console.log(data)  


      var result = data["Usuario"];
      this.id = result["id_usuario"];

      //console.log("Result"+result);
      console.log("ID:  "+this.id);

      if(this.id != 0){
        loading.dismiss();
        this.navCtrl.push(TabsPage, {
          data: this.id
        });
      }else{
        alert("Los Datos no Coinciden");
        loading.dismiss();
      }
             
        
       
    },
    (error) =>{
      console.log("Error"+JSON.stringify(error));
      alert("Verifica que cuentes con internet");
    }
  );
}


}
