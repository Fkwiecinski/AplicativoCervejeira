import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ContactProvider } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-produzindo',
  templateUrl: 'produzindo.html',
})
export class ProduzindoPage {

  producao: Observable<any>;
  chave: any;
  mensagem: any;
  tempeAtu: any;
  tempePro: any;
  tempoAtu: any;
  tempoPro: any;
  tempoTot: any;
  rampaAtu: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private provider: ContactProvider) {

                this.producao = this.provider.getProduzindo();
                console.log(this.producao);
                this.mensagem = "Por enquanto nada";
                this.tempeAtu = 10;
                this.tempePro = 10;
                this.tempoAtu = 100;
                this.tempoPro = 100;
                this.rampaAtu = 0;
                this.tempoTot = 100;
  }



  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProduzindoPage');
  }

}
