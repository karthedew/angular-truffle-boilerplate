import { Component } from '@angular/core';
import Web3 from 'web3';
import { WalletConnectService } from './core/services/wallet-connect/wallet-connect.service';

import { Web3serviceService } from "./core/services/web3/web3service.service";

import { map } from "rxjs/operators";

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
  
  // --- Local Variables ---
  title: string     = 'angular-truffle-boilerplate';
  loggedIn: boolean = false;
  ammount: any;
  account: any;

  constructor(
    private walletConnectService: WalletConnectService
  ) {

    // --- Check MetaMask Login ---
    this.walletConnectService.checkMetaMaskConnection();
    this.walletConnectService.isConnected$.subscribe(
      (res:any) => this.loggedIn = res)

  }

}
