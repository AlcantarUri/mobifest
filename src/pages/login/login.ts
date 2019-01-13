import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';




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
  rol:any;
 

  mobiliarioPage = TabsPage;



  /////Prueba Json
  public items:any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl:LoadingController, public http: HttpProvider, public storage: Storage) {

    
    
    
    
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


        //var result = data["Usuario"];
        

       // console.log(data["rol"]);

       var json = data["Usuario"];
       console.log("este es el json: "+json);

       for (var i = 0; i < json.length; i++) {
       // console.log(json[i].nombre_mob);
       this.rol = json[i].rol;
       this.id=json[i].id_usuario;
       }

      // console.log(this.id+this.rol);

      
     
      //console.log("Result"+result);
      console.log("ID:  "+this.id);

      if(this.id != 0){
        loading.dismiss();
        if(this.rol == "Administrador"){

        this.navCtrl.push(TabsPage, {
          data: this.id
        });

      }else{

        let toast = this.toastCtrl.create({
          message: 'Este Usuario no tiene los Privilegios necesarios',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();
  
        
      }
      }else{

        this.presentToast();
       
        loading.dismiss();
      }
   
               
          
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        this.internetToast();
      }
    );

   // alert("Usuario:"+this.usuario+"       Contraseña:"+this.contra);
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'El Usuario y/o la Contraseña no existen',
    duration: 3000,
    position: 'top'
  });

  toast.present();
}


internetToast() {
  let toast = this.toastCtrl.create({
    message: 'Verifica que cuentes con Internet',
    duration: 3000,
    position: 'top'
  });

  toast.present();
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


     
        //var result = data["Usuario"];
        

       // console.log(data["rol"]);

       var json = data["Usuario"];

       for (var i = 0; i < json.length; i++) {
       // console.log(json[i].nombre_mob);
       this.rol = json[i].rol;
       this.id=json[i].id_usuario;
       }

      // console.log(this.id+this.rol);

      
     
      //console.log("Result"+result);
      console.log("ID:  "+this.id);

      if(this.id != 0){
        loading.dismiss();
        if(this.rol == "Administrador"){

        this.navCtrl.push(TabsPage, {
          data: this.id
        });

      }else{

        let toast = this.toastCtrl.create({
          message: 'Este Usuario no tiene los Privilegios necesarios',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();
  
        
      }
      }else{

        this.presentToast();
       
        loading.dismiss();
      }
   
             
        
       
    },
    (error) =>{
      console.log("Error"+JSON.stringify(error));
      this.internetToast();
    }
  );
}


}
