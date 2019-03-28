import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NotasPage } from '../notas/notas';




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
  
  usuariodos:string;
  contrados:string;

  mobiliarioPage = TabsPage;



  /////Prueba Json
  public items:any;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public loadingCtrl:LoadingController, 
              public http: HttpProvider, 
              public storage: Storage,
              public alertCtrl: AlertController) {

    
    
    
    
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

  verifivarllenos()
  {
    if(this.usuariodos == null || ""){

      let toast = this.toastCtrl.create({
        message: 'Ingresa un usuario',
        duration: 1500,
        position: 'top'
      });
      toast.present();
      
    }else if (this.contra == null || "") {
      
      let toast = this.toastCtrl.create({
        message: 'Ingresa una contraseña',
        duration: 1500,
        position: 'top'
      });
      toast.present();

    }else {
      this.someFunction();
    }
  }

  someFunction() {

   
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
       //guardamos rol y id en variables
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

        this.navCtrl.setRoot(NotasPage,{user: this.usuario,pass: this.contra});
       


        this.presentToast("Hola usuario...", "top");
       
        loading.dismiss();
      }
   
               
          
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        this.internetToast();
      }
    );
    
}

presentToast(mensaje: string, posision: any) {
  let toast = this.toastCtrl.create({
    message: mensaje,
    duration: 3000,
    position: posision
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

        this.presentToast("Hola usuario!", "top");
       
        loading.dismiss();
      }
   
             
        
       
    },
    (error) =>{
      console.log("Error"+JSON.stringify(error));
      this.internetToast();
    }
  );
}

////////////lo nuevo
registrar() {
  let alert = this.alertCtrl.create({
    title: 'Usuario Nuevo',
    inputs: [
      {
        name: 'user',
        placeholder: 'Correo Electrónico'
      },
      {
        name: 'pass',
        placeholder: 'Contraseña'
      },{
        name: 'pass2',
        placeholder: 'Confirma tu contraseña'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Registrar',
        handler: data => {

if (data.pass == data.pass2) {
  
  this.registrarUsuarioNotas(data.user, data.pass);
}else {
  this.presentToast("Ambas contraseñas deben ser iguales", "bottom")
}
    
        }
      }
    ]
  });
  alert.present();
}


registrarUsuarioNotas(user, pass){
  
  this.http.registrarUsuarioNotas(user, pass).then(
    (res)=>{
      var answer = res["registro"];
      console.log(answer);
      if (answer == "registrado") {
        this.presentToast("Registro Exitoso", "middle");
        this.anadirNotas(user,"Bienvenido","Te damos la bienvenida a NotasSeguras Mobifest :D donde"+
        " podras guardar de manera segura tus notas. <br/>Puedes borrar esta nota cuando quieras."+
        "<br/>Sinceramente CarlitosRugratz DP");
      } else {
        this.presentToast("Nombre de usuario no disponible", "middle");
      }
    }
  )
}

anadirNotas(user, note, body)
  {
    this.http.meterNotas(user,note,body,"").then(
      (res)=>{

        this.respuesta= res["notasuno"];
        console.log(this.respuesta);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }


}
