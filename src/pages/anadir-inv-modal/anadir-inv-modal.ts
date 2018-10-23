import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, ViewController, ActionSheetController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the AnadirInvModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anadir-inv-modal',
  templateUrl: 'anadir-inv-modal.html',
})
export class AnadirInvModalPage {

  theWallImageUrl: any=  "../assets/img/ic_card.jpg";
  nombre_extra_item = true;
  precio_extra_item = true;

 
  todo = {};
  

  /////Fotos////
  base64Image:any;
  photos : any;

  constructor(public camera: Camera,
              public platform: Platform, 
              public actionSheetCtrl: 
              ActionSheetController, 
              private view: ViewController,
              public http: HttpProvider) {

    this.nombre_extra_item = true;
    this.precio_extra_item = true;

      this.theWallImageUrl = "../assets/img/ic_card.jpg";
  }


  tgExtras(){
    this.nombre_extra_item = !this.nombre_extra_item;
    this.precio_extra_item = !this.precio_extra_item;
  }
  cerrarModal(){
    this.view.dismiss();
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad AnadirInvModalPage');
  }

  logForm() {
    console.log(this.todo);


    this.http.insertarInventario(this.todo).then(
      (res) => { 
        console.log(res);
      },
      (error) =>{
        console.error(error);
      }
    )
    


  }

  openeditprofile() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Que Quieres Hacer?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Tomar Foto',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
          handler: () => {
            this.takephoto();
          }
        },
        {
          text: 'Elegir Foto de la Galeria',
          icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
          handler: () => {
            this.openGallery();
          }
        },
  ]
});
actionSheet.present();
}

takephoto() {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
   
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          this.base64Image  = 'data:image/jpeg;base64,' + imageData;
          this.photos.push(this.base64Image);
          this.photos.reverse();
          this.theWallImageUrl = this.photos;
        }, (err) => {
          // Handle error
        })
      }
   
       openGallery() {
   
       const options: CameraOptions = {
         quality: 100,
         destinationType: this.camera.DestinationType.DATA_URL,
         encodingType: this.camera.EncodingType.JPEG,
         mediaType: this.camera.MediaType.PICTURE,
         sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
       }
   
       this.camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64:
         this.base64Image  = 'data:image/jpeg;base64,' + imageData;
         this.photos.push(this.base64Image);
         this.photos.reverse();
         this.theWallImageUrl = this.photos;
       }, (err) => {
         // Handle error
       })}

}
