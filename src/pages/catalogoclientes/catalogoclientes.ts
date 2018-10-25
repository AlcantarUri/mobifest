import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


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

  colores: [
    { bgcolor: '#DEE1E1'},
    { bgcolor: '#FFFFFF'}
   ];

  constructor( public view: ViewController, public http: HttpProvider ) {
    this.traerDatos();
    this.initializeItems();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoclientesPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  traerDatos(){
    this.http.revisarClientes().then(
      (inv) => { 
        console.log(inv)     
        

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
