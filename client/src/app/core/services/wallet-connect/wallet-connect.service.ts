import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";

// WalletConnect Imports 
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BehaviorSubject, Subject } from 'rxjs';

// Web3 Imports
import Web3 from "web3";
import Web3Modal from "web3modal";

declare var process : {
  env: {
    INFURA_ID: string
  }
}

require("dotenv").config()

@Injectable({
  providedIn: 'root'
})
export class WalletConnectService {

  private web3js: any;
  private provider: any;
  private accounts: any;

  web3Modal: Web3Modal;


  // --- SUBJECTS & BEHAVIOR SUBJECTS ---
  private accountStatusSource = new Subject<any>();
  private isConnectedSource = new BehaviorSubject<any>(false);

  // --- OBSERVABLES to BEHAVIOR SUBJECTS ---
  // We want to omit the "next value" to everything that is subscribed to it.
  public accountStatus$ = this.accountStatusSource.asObservable();
  public isConnected$ = this.isConnectedSource.asObservable();

  

  constructor() {

    console.log('The Account Status Source: ', this.accountStatusSource)

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: environment.INFURA_ID
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet",   // optional
      cacheProvider: true,  // optional
      providerOptions,      // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    })

  }

  // ======================
  // --- PUBLIC METHODS ---
  // ======================

  async connectAccount() {

    console.log('The INFURA_ID: ', environment.INFURA_ID)
    this.web3Modal.clearCachedProvider();

    this.provider = await this.web3Modal.connect();
    this.web3js   = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
    console.log('The Account Status Source: ', this.accountStatusSource)
  }

  public async checkMetaMaskConnection() {
    let web3: any;

    if ((window as any).ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }

    web3.eth.getAccounts()
      .then(async (addr: string) => {
        console.log('The User address: ', addr)
      })
  }

  
  public GetAccounts() {
    return this.accounts
  }
  

}
