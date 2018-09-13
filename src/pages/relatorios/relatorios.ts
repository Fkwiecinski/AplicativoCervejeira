import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactProvider } from '../../providers/contact/contact';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {

  producoes: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private provider: ContactProvider) {

                this.producoes = this.provider.getAll();

  }

  escolha(producao: any){
    this.navCtrl.push('RelatorioDetalhadoPage', { producao: producao });
  }

}
