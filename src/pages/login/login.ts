import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../../providers/http/http';
import { TabsPage } from '../tabs/tabs';



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
 

  mobiliarioPage = TabsPage;



  /////Prueba Json
  public items:any;

  constructor(public navCtrl: NavController, public http: HttpProvider, public storage: Storage) {

    
    
    
    
    this.storage.get('USU').then((usu) =>{
      console.log(usu);
      this.usuario = usu;
    });

    this.storage.get('PASS').then((pass) =>{
      console.log(pass);
      this.contra = pass;
    });

    
    

    
  }

  public notify() {
    console.log("Recuerdame es: "+ this.recuerda);
    //alert(this.recuerda);
  }


  someFunction(event: Event) {
    event.stopPropagation();

    if(this.recuerda == true){
      this.storage.set('USU',this.usuario);
      this.storage.set('PASS',this.contra);
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
          this.navCtrl.push(TabsPage, {
            data: this.id
          });
        }else{
          alert("Los Datos no Coinciden")
        }
               
          
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

   // alert("Usuario:"+this.usuario+"       Contraseña:"+this.contra);
}


}
