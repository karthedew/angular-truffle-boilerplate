import { Component } from '@angular/core';

import { Web3serviceService } from "./core/services/web3/web3service.service";

declare let require: any;
declare let window: any;
const tokenABI = require('./artifacts/MetaCoin.json');
const contract = require('@truffle/contract');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web3front';

  ammount: any;
  account: any;

  constructor(private web3Service: Web3serviceService) {

    let accnts = web3Service.getAccounts();

    accnts.then((instance) => {
      console.log(instance)
      this.account = instance[0];
    });

    // console.trace();

    // let value = this.getEtherBalance(this.account);
    let value = web3Service.getEtherBalance(this.account);

    // console.trace();

    console.log(web3Service.web3)

  }


  // getEtherBalance(account: string) {

  //   return new Promise( function ethBalance (resolve, reject) {
  //     let deployed;

  //     const MetaContract = contract(tokenABI);

  //     MetaContract.setProvider(this.web3);

  //     this.MetaContract.deployed().then(function resolver(instance) {
  //       deployed = instance;
  //       return instance.getBalanceInEth.call(account)
  //     }).then((result) => {
  //       console.log(result)
  //       return resolve(result)
  //     }).catch(err => {
  //       reject(err);
  //     })
  //   })
  // }
}
