import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController) {
  }

  async login(user: User){
    var errorCode = "";
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .catch(function(error){
        errorCode = error.code;
        console.log(error);
        });
      console.log(result);
      if (result && errorCode == "") {
        this.navCtrl.setRoot('HomePage');
      }
      else{
        this.toast.create({
          message: "E-mail ou senha incorretos, já realizou seu cadastro?",
          duration: 5000
        }).present();
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  ionViewWillLoad() {
    this.afAuth.auth.signOut();
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }
}
