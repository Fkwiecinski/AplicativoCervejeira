import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ContactProvider } from "./../../providers/contact/contact";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProduzindoPage } from '../produzindo/produzindo';

@IonicPage()
@Component({
  selector: 'page-producao',
  templateUrl: 'producao.html',
})
export class ProducaoPage {

  contacts: any;
  form: FormGroup;
  public tap: number = 0;
  rampas: any;
  lupulo: any;
  lixo: any;
  last: any;
  verificacao: Observable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private provider: ContactProvider,
              private toast: ToastController,
              public alertCtrl: AlertController) {

                this.verificacao = this.provider.getLastPro();                
                this.lixo = [];
                this.contacts = { };       
                this.rampas = [];   
                this.lupulo = [];
                this.contacts.name = "";
                this.createForm();  
  }

  doPrompt() {
    this.tap++;
    let prompt = this.alertCtrl.create({
      title: 'Criar rampas',
      message: "Adicione a temperatura e o tempo da rampa " + this.tap,
      inputs: [
        {
          name: 'temperatura',
          placeholder: 'Temperatura'
        },
        {
          name: 'tempo',
          placeholder: 'Tempo em minutos'
        },
      ],
      buttons: [
        {
          text: 'Criar outra',
          handler: data => {
            this.lixo = this.lixo + data;
            this.rampas = this.rampas + data.temperatura;
            this.rampas = this.rampas + '-';
            this.rampas = this.rampas + data.tempo;
            this.rampas = this.rampas + '/';
            //console.log(this.lixo);
            //console.log(this.rampas);
            this.doPrompt();
          }
        },
        {
          text: 'Continuar',
          handler: data => {
            this.lixo = this.lixo + data;
            this.rampas = this.rampas + data.temperatura;
            this.rampas = this.rampas + '-';
            this.rampas = this.rampas + data.tempo;
            //console.log(this.lixo);
            //console.log(this.rampas);
            this.createForm();
            this.doPromptFervura();
          }
        },
        {
          text: 'Reiniciar',
          handler: data => {
            this.recomecar();
            this.doPrompt();
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
            //console.log(this.rampas);
            this.recomecar();
          }
        }
      ]
    });
    prompt.present();
  } 

  doPromptNome() {
    let prompt = this.alertCtrl.create({
      title: 'Nome da produção',
      message: "Adicione nome a produção",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        },
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: data => {
            this.contacts.name = data.name;
            this.createForm();
            this.doPrompt();
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
          }
        }
      ]
    });
    prompt.present();
  } 

  doPromptFervura() {
    let prompt = this.alertCtrl.create({
      title: 'Etapa da fervura',
      message: "Coloque o tempo em minutos que a etapada da fervura vai durar",
      inputs: [
        {
          name: 'fervura',
          placeholder: 'Tempo em minutos'
        },
      ],
      buttons: [
        {
          text: 'Salvar',
          handler: data => {
            this.lixo = this.lixo + data;
            this.lupulo = this.lupulo + data.fervura + "/";
            console.log(this.lixo);
            console.log(this.lupulo);
            this.createForm();
            this.doPromptLupulo();
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
            //console.log(this.rampas);
            this.recomecar();
          }
        }
      ]
    });
    prompt.present();
  }

  doPromptLupulo() {
    let prompt = this.alertCtrl.create({
      title: 'Adição de lupulos',
      message: "Coloque o tempo em minutos que irá ser adicionados os lupulos na fase da fervura. Lembrando que o tempo da fervura começara em 0. Ex.:10 (Adiciono lupulo aos 10 minutos da fase da fervura)",
      inputs: [
        {
          name: 'lupulo',
          placeholder: 'Momento em minutos'
        },
      ],
      buttons: [
        {
          text: 'Adicionar outro tempo',
          handler: data => {
            this.lixo = this.lixo + data;
            this.lupulo = this.lupulo + data.lupulo;
            this.lupulo = this.lupulo + '-';
            //console.log(this.lixo);
            console.log(this.rampas);
            this.doPromptLupulo();
          }
        },
        {
          text: 'Salvar e produzir!',
          handler: data => {
            this.lixo = this.lixo + data;
            this.lupulo = this.lupulo + data.lupulo;
            //console.log(this.lixo);
            console.log(this.rampas);
            this.createForm();
          }
        },
        {
          text: 'Reiniciar',
          handler: data => {
            this.recomecar();
            this.doPromptNome();
          }
        },
        {
          text: 'Cancelar',
          handler: data => {
            //console.log(this.rampas);
            this.recomecar();
          }
        }
      ]
    });
    prompt.present();
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.contacts.key],
      name: [this.contacts.name, Validators.required],
      ramp: [this.tap],
      lupulo: [this.lupulo],
      temp: [this.rampas]
    })
  }

  recomecar(){
    this.form.value.key = null;
    this.form.value.name = null;
    this.form.value.ramp = null;
    this.form.value.temp = null;
    this.form.value.lupulo = null;
    this.contacts.name = "";
    this.tap = 0;
    this.lupulo = [];
    this.rampas = [];
    this.createForm();
    this.toast.create({ message: 'Reiniciada criação de receita', duration: 3000 }).present();
  }

  getLast(){
    this.last = this.provider.getLast();
    //console.log("Depois do pedido de last " + this.last);
    this.submit();
    this.form.value.key = this.last;
    //console.log(this.form.value); 
    this.navCtrl.setRoot('ProduzindoPage', { produzindo: this.form.value.key });
  }

  submit(){
    if(this.form.valid){
      var x = this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Receita salva com sucesso.', duration: 3000 }).present();
          //console.log(this.form.value);
          this.last = this.provider.getLast();
          //console.log("Depois do confirma " + this.last);
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar receita.', duration: 3000 }).present();
          console.error(e);
        })
      console.log(x);
    }
    this.provider.savePro(this.form.value)
  }

  ionViewDidLoad() {
    console.log(this.verificacao);
    if(this.verificacao){
      this.navCtrl.setRoot(ProduzindoPage);
    }
  }
}