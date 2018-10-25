import { Component } from '@angular/core';
import { IonicPage, ViewController, ActionSheetController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../../providers/http/http';
import { Platform } from 'ionic-angular';




/**
 * Generated class for the EditarInventarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-inventario',
  templateUrl: 'editar-inventario.html',
})
export class EditarInventarioPage {

  theWallImageUrl: any=  "../assets/img/ic_card.jpg";
  base64Image:any;
  photos : any;

  cantidad_mob:string;
  nombre_mob:string;
  costo_mob:string;
  extra_mob:string;
  extra_costo_mob:string;
  id_mob:string;



  todo={};
  resivido:string;
  detainv:string[];


  constructor(public camera: Camera,
    public platform: Platform, 
    public actionSheetCtrl: 
    ActionSheetController, 
    private view: ViewController,
    public http: HttpProvider,
    public params: NavParams) {

      this.theWallImageUrl = "../assets/img/ic_card.jpg";

     // console.log(params.get('nombre'));

     this.resivido = params.get('nombre');

     var i = 0, strLength = this.resivido.length;
 
     for(i; i < strLength; i++) {
  
      this.resivido = this.resivido.replace(" ", "_");
  
     
     }

     //console.log(this.resivido);

     this.detalle(this.resivido);


     
  }

  detalle(nombre:string){

    this.http.sacarDetalles(nombre).then(
      (data) => { 
       // console.log(data)  

        this.detainv = data["detalle"];
        
       
        console.log(nombre);

       // console.log("Resultado"+JSON.stringify(this.detainv));

        

         var json = data["detalle"];

       for (var i = 0; i < json.length; i++) {
       // console.log(json[i].nombre_mob);
       this.cantidad_mob = json[i].cantidad_mob;
       this.nombre_mob = json[i].nombre_mob;
       this.costo_mob = json[i].costo_mob;
       this.extra_mob = json[i].extra_mob;
       this.extra_costo_mob = json[i].extra_mob_costo;
       this.id_mob = json[i].id_mob;
       }

        



      },
      (error) =>{
        console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
      }
    );


  }

  logForm() {
    

    this.http.modificarInventario(this.id_mob,this.nombre_mob,this.cantidad_mob,this.costo_mob, this.extra_mob, this.extra_costo_mob).then(
      (res) => { 
        console.log(res["registro"]);

        if(res["registro"] == "registrado"){
          alert("Registro Existoso");
          this.view.dismiss();
        }else if(res["registro"] == "noregistrado"){
          alert("No Registrado Asegurate de Cntar con Internet");
        }
      },
      (error) =>{
        console.error(error);
        alert("No Registrado Asegurate de Cntar con Internet"+error);
      }
    )
    


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarInventarioPage');
  }

  cerrarModal(){
    this.view.dismiss();
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
