import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from "../pages/home/home.module";
import { ProducaoPage } from '../pages/producao/producao';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { ProducaoPageModule } from '../pages/producao/producao.module';
import { RelatoriosPageModule } from '../pages/relatorios/relatorios.module';
import { ContactProvider } from '../providers/contact/contact';
import { RelatorioDetalhadoPage } from '../pages/relatorio-detalhado/relatorio-detalhado';
import { RelatorioDetalhadoPageModule } from '../pages/relatorio-detalhado/relatorio-detalhado.module';
import { ProduzindoPage } from '../pages/produzindo/produzindo';
import { ProduzindoPageModule } from '../pages/produzindo/produzindo.module';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    //ProducaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HomePageModule,
    ProducaoPageModule,
    RelatoriosPageModule,
    RelatorioDetalhadoPageModule,
    ProduzindoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProducaoPage,
    RelatoriosPage,
    RelatorioDetalhadoPage,
    ProduzindoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactProvider
  ]
})
export class AppModule {}
