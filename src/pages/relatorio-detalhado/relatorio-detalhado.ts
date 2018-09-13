import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactProvider } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-relatorio-detalhado',
  templateUrl: 'relatorio-detalhado.html',
})

export class RelatorioDetalhadoPage {

  producao: any;
  form: FormGroup;
  tempoPro: any;
  tempePro: any;
  tempPro: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private provider: ContactProvider,
              private toast: ToastController) {
                
    this.tempePro = [];
    this.tempoPro = [];
    this.tempPro = [];
    this.producao = this.navParams.data.producao;
    this.createForm();

  }

  ionViewDidLoad(){
    this.producao.tempPro = this.producao.tempPro.split("/");
    console.log(this.producao.tempPro);
    for(var x in this.producao.tempPro){
      var y = this.producao.tempPro[x].split("-");
      console.log(y);
      this.tempePro[x] = y[0];
      this.tempoPro[x] = y[1];
    }
    console.log(this.tempePro);
    console.log(this.tempoPro);
    for(var f = 0; f < this.producao.ramp; f++){
      this.tempPro[f] = this.tempoPro[f] + "°C / " + this.tempePro[f] + " minutos";
    }
    console.log(this.tempPro);
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.producao.key],
      name: [this.producao.name, Validators.required],
      ramp: [this.producao.ramp, Validators.required],
    });
  }

  submitAlterar(){
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Produção alterada com sucesso.', duration: 3000}).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao alterar o relatório', duration: 3000}).present();
          console.error(e);
        })
    }
  }

  submitRemover(key: string){
    this.provider.remove(key)
      .then(() => {
        this.toast.create({ message: 'Relatório excluido com sucesso.', duration: 3000}).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao excluir o relatório.', duration: 3000}).present();
        console.error(e);
      })
  }

}
