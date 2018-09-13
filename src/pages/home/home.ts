import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  constructor(private afauth: AngularFireAuth,
              private toast: ToastController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public loading: LoadingController) {
  }

  ionViewWillLoad() {
    this.afauth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Bem vindo ao AppCervejeiro, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Não foi encontrado dados`,
          duration: 3000
        }).present();
      }
    });
  }

  produzir(){
    this.navCtrl.setRoot('ProducaoPage');
  }

  relatorios(){
    this.loading.create({
      content: "Aguarde...",
      duration: 3000
    }).present;
    this.navCtrl.setRoot('RelatoriosPage');
  }

}
