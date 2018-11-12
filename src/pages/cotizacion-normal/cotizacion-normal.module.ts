import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CotizacionNormalPage } from './cotizacion-normal';

@NgModule({
  declarations: [
    CotizacionNormalPage,
  ],
  imports: [
    IonicPageModule.forChild(CotizacionNormalPage),
  ],
})
export class CotizacionNormalPageModule {}
