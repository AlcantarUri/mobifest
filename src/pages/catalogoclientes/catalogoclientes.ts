import { Component } from '@angular/core';
import { IonicPage, ViewController, AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ItemSliding } from 'ionic-angular';



/**
 * Generated class for the CatalogoclientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogoclientes',
  templateUrl: 'catalogoclientes.html',
})
export class CatalogoclientesPage {

  compl: string[];
  inventario: any;
  searchQuery: string = '';

  eliminado: any;

  colores: [
    { bgcolor: '#DEE1E1'},
    { bgcolor: '#FFFFFF'}
   ];

  constructor( public view: ViewController, public toastCtrl: ToastController, public http: HttpProvider, public alertCtrl: AlertController ) {
    this.traerDatos();
    this.initializeItems();
  
  }

  update(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoclientesPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  abrirEditar(nombre:string, telefono:string, correo:string, id:string, slidingItem: ItemSliding){

    this.presentEditar(nombre,telefono, correo, id);

    slidingItem.close();
  }

  abrirEliminar(id:string, slidingItem: ItemSliding){

    const confirm = this.alertCtrl.create({
      title: 'Estas seguro que deseas eliminar a este cliente?',
      message: 'Se eliminara de la lista de clientes y no podra ser recuperado ',
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
            this.eliminarCliente(id);
          }
        }
      ]
    });
    confirm.present();
  

    slidingItem.close();
  }

  eliminarCliente(id:string){
    this.http.eliminarCliente(id).then(
      (inv) => { 
        //console.log(inv) 

        //console.log(inv["cliente"]);
          
        if(inv["cliente"] == "eliminado"){

          let toast = this.toastCtrl.create({
            message: 'Cliente Eliminado',
            duration: 3000,
            position: 'top'
          });
        
          toast.present();
          this.update();

        }else{

          let toast = this.toastCtrl.create({
            message: 'Fallo la eliminacion Contacta Administrador',
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

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Cliente Nuevo',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Jose Manuel G de la O' 
        },
        {
          name: 'telefono',
          placeholder: '6181020927',
          type: 'number'
        },
        {
          name: 'correo',
          placeholder: 'Escribe la dirección'
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

            this.anadirCliente(data.nombre, data.telefono,data.correo);
           
          }
        }
      ]
    });
    alert.present();
  }

  presentEditar(nombre:string, telefono:string, correo:string, id:string) {
    let alert = this.alertCtrl.create({
      title: 'Editar Cliente',message: 'Editar Cliente Seleccionado',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Jose Manuel G de la O',
          value: nombre
        },
        {
          name: 'telefono',
          placeholder: '6181020927',
          type: 'number',
          value: telefono
        },
        {
          name: 'correo',
          placeholder: 'JoseManuelGdlO@gmail.com',
          value: correo
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
          text: 'Editar',
          handler: data => {

            
            this.editarCliente(data.nombre, data.telefono,data.correo, id);
           
          }
        }
      ]
    });
    alert.present();
  }

  anadirCliente(nombre:string, telefono:string, correo:string){

    this.http.anadirCliente(nombre,telefono,correo).then(
      (inv) => { 
       // console.log(inv)     
        
        if(inv["cliente"] == "registrado"){
          let toast = this.toastCtrl.create({
            message: 'El cliente ha quedado registrado',
            duration: 3000,
            position: 'top'
          });
        
          toast.present();
          this.update();
        }else if(inv["cliente"] == "noregistrado"){

          let toast = this.toastCtrl.create({
            message: 'Ha ocurrido un error intenta mas tarde',
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

  editarCliente(nombre:string, telefono:string, correo:string, id:string){

    
    this.http.editarCliente(nombre,telefono,correo, id).then(
      (inv) => { 
        console.log(inv)     
        
        if(inv["cliente"] == "editado"){
          let toast = this.toastCtrl.create({
            message: 'El cliente ha sido editado',
            duration: 3000,
            position: 'top'
          });
        
          toast.present();
          this.update();
        }else if(inv["cliente"] == "noEditado"){

          let toast = this.toastCtrl.create({
            message: 'Ha ocurrido un error intenta mas tarde',
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


  traerDatos(){
    this.http.revisarClientes().then(
      (inv) => { 
       // console.log(inv)     
        

       this.inventario = inv["clientes"];
       this.compl = inv["clientes"];

      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  initializeItems() {

    this.inventario = this.compl;
    
    }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.inventario = this.inventario.filter((item) => {
        return (item.nombre_cliente.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
    }

    
  }

}
