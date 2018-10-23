import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MobiliarioPage } from '../pages/mobiliario/mobiliario';
import { DetallePage } from '../pages/detalle/detalle';
import { TabsPage } from '../pages/tabs/tabs';

import { NgCalendarModule } from 'ionic2-calendar';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MobiliarioPage,
    DetallePage,
    TabsPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MobiliarioPage,
    DetallePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    Camera,
    IonicStorageModule,
    SelectSearchableModule
    
  ]
})
export class AppModule {}
