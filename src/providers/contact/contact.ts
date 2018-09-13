import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
 
@Injectable()
export class ContactProvider {
 
  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
  }

  private PATH = this.afAuth.auth.currentUser.uid + '/producoes/';
 
  getAll() {
    this.afAuth.auth.currentUser;
    this.PATH = this.afAuth.auth.currentUser.uid + '/producoes/';
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  removePro(){
    this.afAuth.auth.currentUser;
    this.PATH = this.afAuth.auth.currentUser.uid + '/produzindo/';
    return this.db.list(this.PATH).remove();
  }

  savePro(item: any){
    this.afAuth.auth.currentUser;
    this.PATH = this.afAuth.auth.currentUser.uid + '/produzindo/';
    console.log(this.PATH);
    return new Promise((resolve, reject) => {
      if (item.key) {
        this.db.list(this.PATH)
          .update(item.key, { name: item.name, temp: item.temp })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: item.name, 
                  ramp: item.ramp, 
                  tempoLupulo: item.lupulo,
                  tempPro: item.temp, 
                  tempAlc: "", 
                  controle: "000", 
                  tempoAlc: "", 
                  tempoTot: "" })
          .then(() => resolve());
      }
    })
  }

  getProduzindo() {
    this.afAuth.auth.currentUser;
    this.PATH = this.afAuth.auth.currentUser.uid + '/produzindo/';
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
 
  get(key: string) {
    this.PATH = this.afAuth.auth.currentUser.uid + '/produzindo/';
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(item: any) {
    this.afAuth.auth.currentUser;
    this.PATH = this.afAuth.auth.currentUser.uid + '/producoes/';
    console.log(this.PATH);
    return new Promise((resolve, reject) => {
      if (item.key) {
        this.db.list(this.PATH)
          .update(item.key, { name: item.name, ramp: item.ramp })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: item.name, 
            ramp: item.ramp, 
            tempoLupulo: item.lupulo,
            tempPro: item.temp, 
            tempAlc: "", 
            tempoTot: "" })
          .then(() => resolve());
      }
    })
  }
 
  getLast(){
    var Last;
    this.PATH = this.afAuth.auth.currentUser.uid + '/producoes/';
    var referencia = this.db.database.ref(this.PATH);
    referencia.on("child_added", function(data, ChildKey){
      //var newData = data.val();
      //console.log("newData" + data.key);
      //console.log("Key" + ChildKey);
      Last = data.key;
    });
    return Last;
  }

  getLastPro(){
    var Last;
    this.PATH = this.afAuth.auth.currentUser.uid + '/produzindo/';
    var referencia = this.db.database.ref(this.PATH);
    referencia.on("child_added", function(data, ChildKey){
      //var newData = data.val();
      //console.log("newData" + data.key);
      //console.log("Key" + ChildKey);
      Last = data.key;
    });
    return Last;
  }

  remove(key: string) {
    this.PATH = this.afAuth.auth.currentUser.uid + '/producoes/';
    return this.db.list(this.PATH).remove(key);
  }
  
}