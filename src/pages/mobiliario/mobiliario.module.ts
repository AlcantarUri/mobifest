import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobiliarioPage } from './mobiliario';

@NgModule({
  declarations: [
    MobiliarioPage,
  ],
  imports: [
    IonicPageModule.forChild(MobiliarioPage),
  ],
})
export class MobiliarioPageModule {}
