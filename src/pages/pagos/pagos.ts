import { Component } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ModalController } from 'ionic-angular';


/**
 * Generated class for the PagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagos',
  templateUrl: 'pagos.html',
})
export class PagosPage {

  pagos:any;
  compl: string[];
  
  constructor( public http: HttpProvider, public navParams: NavParams, public view: ViewController, public modCtrl:ModalController) {

    this.sacarPagos();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagosPage');
  }

  cerrarModal(){
    this.view.dismiss();
  }

  sacarPagos(){
    
    this.http.revisarSaldos().then(
      (inv) => { 
       console.log(inv)     
        

       this.pagos= inv["pago"];
       this.compl= inv["pago"];

       console.log(this.pagos);
      
         
      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );
  }

  abono(id:string){
    this.modCtrl.create('SeguimientopagodetallePage',{data: id}).present();
      
  }

  initializeItems() {

    this.pagos = this.compl;
    
    }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.pagos = this.pagos.filter((item) => {
        return (item.nombre_titular_evento.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
    }

    
  }

}
