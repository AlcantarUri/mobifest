import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the AgregarnotamodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregarnotamodal',
  templateUrl: 'agregarnotamodal.html',
})
export class AgregarnotamodalPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCntl:ModalController, 
    public view:ViewController,
    public http:HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarnotamodalPage');
  }

  respuesta:any;
  anadirNotas(user, note, body)
  {
    this.http.meterNotas(user,note,body).then(
      (res)=>{

        this.respuesta= res["notasuno"];
        console.log(this.respuesta);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }


  cerrarModal(){
    this.view.dismiss();
  }


}
