import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the TrabajadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trabajadores',
  templateUrl: 'trabajadores.html',
})
export class TrabajadoresPage {

  inventario:any;
  public currentDate: string = new Date().toLocaleDateString();

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public http: HttpProvider, public navParams: NavParams, public view: ViewController) {

    this.sacarTrabajadores();
    //console.log(this.currentDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrabajadoresPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  sacarTrabajadores(){

    //console.log("entraste al metodo");

    this.http.revisarTrabajadores().then(
      (inv) => { 
      // console.log(inv)     
        

       this.inventario= inv["trabajadores"];

       //console.log(this.trabajadores);
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );

  }


  eliminarTrabjador(id:string){

    const confirm = this.alertCtrl.create({
      title: 'Estas seguro que deseas eliminar a este Usuario?',
      message: 'Se eliminara de la lista de usuarios y no podra ser recuperado ',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.eliminarTrabajadores(id);
          }
        }
      ]
    });
    confirm.present();

  }

  eliminarTrabajadores(id:string){
    this.http.eliminarTrabajador(id).then(
      (inv) => { 
      // console.log(inv)     
        

      if(inv["trabajador"] == "eliminado"){

        let toast = this.toastCtrl.create({
          message: 'Usuario Eliminado',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();
        this.cerrarModal();

      }else{

        let toast = this.toastCtrl.create({
          message: 'Fallo la eliminacion Contacta Administrador',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();

      }

       //console.log(this.trabajadores);
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Usuario Nuevo',
      inputs: [
        {
          name: 'nombre_comp',
          placeholder: 'Nombre Completo' 
        },
        {
          name: 'usuario',
          placeholder: 'Nombre del Usuario'
        },
        {
          name: 'contrasena',
          placeholder: 'Contraseña'
        },
        {
          name: 'correo',
          placeholder: 'Correo Electronico'
        }
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
          text: 'Añadir',
          handler: data => {

            this.decidirRol(data.nombre_comp, data.usuario, data.contrasena, data.correo);
           
          }
        }
      ]
    });
    alert.present();
  }

  decidirRol(nombre:string, usuario:string, contrasena:string, correo:string){

    let alert = this.alertCtrl.create({
      title: 'Decide rol al nuevo Usuario',
      message: 'Elige el tipo de premisos que tendra el usuario',
      buttons: [
        {
          text: 'Administrador',
          role: 'cancel',
          handler: () => {
            this.anadirUsuario(nombre, usuario, contrasena, correo, "Administrador");
          }
        },
        {
          text: 'Repartidor',
          handler: () => {
            this.anadirUsuario(nombre, usuario, contrasena, correo, "Trabajador");
          }
        }
      ]
    });
    alert.present();
  }


  anadirUsuario(nombre:string, usuario:string, contrasena:string, correo:string, rol:string){

  //  console.log(nombre+usuario+contrasena+rol+this.currentDate);

    this.http.anadirUsuario(nombre,usuario,contrasena,correo,rol,this.currentDate).then(
      (inv) => { 
        console.log(inv)     
        
      if(inv["trabajador"] == "registrado"){

        let toast = this.toastCtrl.create({
          message: 'Usuario Agregado',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();
        this.cerrarModal();

        }else{

        let toast = this.toastCtrl.create({
          message: 'Fallo Agregar Usuario Contacta Administrador',
          duration: 3000,
          position: 'top'
        });
      
        toast.present();

      }
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );


  }

}
