  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { text } from '@angular/core/src/render3/instructions';

/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  user : string;
  pass: string;
  notas: any;
  respuesta: any;
  respuestaBorrar: any;

  nombreNota: string;
  cuerponota: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.user = navParams.get('user');
    this.pass = navParams.get('pass');
    this.sacarNotesChidoris();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotasPage');
  }



  sacarNotesChidoris()
  {
    this.http.sacarNotas(this.user,this.pass).then(
      (res)=>{

        this.notas= res["notasuno"];

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  
  }

  agregarnota()
  {
    let alert = this.alertCtrl.create({
      title: 'Nueva Nota',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Titulo de nota'
        },
        {
          type: 'text',
          name: 'cuerpo',
          placeholder: 'Desahogate aqui :V'
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
           
            this.anadirNotas(this.user, this.pass, data.titulo, data.cuerpo);
            this.presentLoadingDefault();
            
          }
        }
      ]
    });
    alert.present();
  }

  anadirNotas(user, pass, note, body)
  {
    this.http.meterNotas(user,pass,note,body).then(
      (res)=>{

        this.respuesta= res["notasuno"];
        console.log(this.respuesta);

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
  }



  borrarNota(id_nota, note, body)
  {
    let alert = this.alertCtrl.create({
      title: note,
      subTitle: body,
      buttons: [
        {
          text: 'Eliminar',
          role: 'cancel',
          cssClass: 'customClass',
          handler: () => {
            
            this.presentConfirm(id_nota);
          }
        },
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }


  presentConfirm(id_nota) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar nota',
      message: 'Esta accion ya no se puede deshacer :C',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, Acepto',
          handler: () => {
            this.loadingDeBorrar(id_nota);
            console.log(id_nota);
          }
        }
      ]
    });
    alert.present();
  }


  loadingDeBorrar(id_nota) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  

    loading.onDidDismiss(() => {

this.confirmar(id_nota);

      
    });
    
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  confirmar(id_nota){
  this.http.borrarNota(id_nota).then(
      (res)=>{

        this.respuestaBorrar = res["evento"];
        console.log(this.respuestaBorrar);
        this.sacarNotesChidoris();

      },(error)=>{
      console.log("Error"+JSON.stringify(error));
        alert("Verifica que cuentes con internet");
    })
    
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Agregando sus notas :V'
    });
  
    loading.onDidDismiss(() => {
      this.sacarNotesChidoris();
    });
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

}
