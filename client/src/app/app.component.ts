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
  title = 'angular-truffle-boilerplate';

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

}
