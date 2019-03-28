import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../../providers/http/http';


/**
 * Generated class for the ModalnotasaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalnotasadd',
  templateUrl: 'modalnotasadd.html',
})
export class ModalnotasaddPage {

  base64Image:string;
  user:string;
  titulo:string;
  texto:string;
  respuesta:any;

  constructor( public http:HttpProvider, public navCtrl: NavController, public navParams: NavParams, public view:ViewController, public camera:Camera) {


    this.user = navParams.get('nombre');
    this.base64Image = "nohay";
    console.log(this.user);
    console.log(this.base64Image);
  }


  foto(){
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.log(err);
    });

  }
  galeria(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });

  }

  
  agregar(){

    console.log(this.base64Image);
 
    this.http.meterNotas(this.user,this.titulo,this.texto,this.base64Image).then(
      (res)=>{

        this.respuesta= res["registro"];
        console.log(this.respuesta);
        this.cerrarModal();

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    });
  

  }

  cerrarModal(){
    this.view.dismiss();
  }

}
