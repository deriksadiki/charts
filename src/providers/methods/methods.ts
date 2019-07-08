
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
declare var firebase
/*
  Generated class for the MethodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MethodsProvider {
  projctArr =  new Array()
  constructor(public loadingCtrl:LoadingController) {
    console.log('Hello MethodsProvider Provider');
  }


  RetrieveProjectBrief() {

  

  return new Promise((resolve, reject) => {

    let loading = this.loadingCtrl.create({

      spinner: 'bubbles',

      content: 'Loading data...',

      duration: 4000000

    });

    loading.present();

    firebase.database().ref("ProjectBrief").on("value", (data: any) => {
      let details = data.val();

      if( data.val() != null || data.val() !=undefined){
        this.projctArr=[];
      let keys = Object.keys(data.val());

      console.log(keys)

        for (var i = 0; i < keys.length; i++) {

          // this.projctArr.length=0;

        firebase.database().ref("ProjectBrief/" + keys[i]).on("value", (data2: any) => {

           let values = data2.val();

           console.log(values)

           let inderKeys = Object.keys(values)

           console.log(inderKeys)

           for (var x = 0; x < inderKeys.length; x++) {

            let key = inderKeys[x];

            console.log(key)

            let obj = {

              Requestingfunds: values[key].Requestingfunds,

              deadline: values[key].deadline,

              Completion: values[key].Completion,

              ProjectFile: values[key].ProjectFile,

              token: values[key].token,

              Amount: values[key].Amount,

              name: values[key].name,

              k:key              

            }

            console.log(obj)

            this.projctArr.push(obj)

          

            console.log(this.projctArr)

          

           }           
           resolve(this.projctArr)
        })      

      }
      setTimeout(() => {
        loading.dismiss();
      }, 2000);
    

    }



  })

})

}
}
