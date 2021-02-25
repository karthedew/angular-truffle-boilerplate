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
  public provider: any;
  private accounts: any;

  public web3Modal: Web3Modal;


  // --- SUBJECTS & BEHAVIOR SUBJECTS ---
  private accountStatusSource   = new Subject<any>();
  private isConnectedSource     = new BehaviorSubject<any>(false);
  private walletAccountsSource  = new BehaviorSubject<any>(['']);
  private currentProviderSource = new BehaviorSubject<any>('');

  // --- OBSERVABLES to BEHAVIOR SUBJECTS ---
  // We want to omit the "next value" to everything that is subscribed to it.
  public accountStatus$   = this.accountStatusSource.asObservable();
  public isConnected$     = this.isConnectedSource.asObservable();
  public walletAccounts$  = this.walletAccountsSource.asObservable();
  public currentProvider$ = this.currentProviderSource.asObservable();

  

  constructor() {

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: environment.INFURA_ID
        }
      }
    };

    this.web3Modal = new Web3Modal({
      // network: "mainnet",   // optional
      // cacheProvider: true,  // optional
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

  public async connectAccount(): Promise<void> {
    this.web3Modal.clearCachedProvider();

    // --- Connect the Provider ---
    this.provider = await this.web3Modal.connect();
    this.web3js   = new Web3(this.provider);

    // --- Connect the Account(s) ---
    this.accounts = await this.web3js.eth.getAccounts();

    // --- Update Sources / Behavior Subjects ---
    this.accountStatusSource.next(this.accounts);
    this.isConnectedSource.next(true);
    this.walletAccountsSource.next(this.accounts);
  }

  public async checkMetaMaskConnection(): Promise<void> {
    let web3: any;

    // --- Check if ethereum or web3 is injected ---
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }

    // --- Get the Accounts from the login ---
    web3.eth.getAccounts()
      .then(async (addr: string) => {
        // Check if address exists.
        if (addr.length != 0) {
          this.walletAccountsSource.next(addr);
          this.isConnectedSource.next(true);
        }
        
      })
  }

  
  public async logout() {
    await this.web3Modal.clearCachedProvider(); 
    this.isConnectedSource.next(false);
  }



  // ======================
  // --- PUBLIC METHODS ---
  // ======================

  private getProviderName(chainId: string): string {

    if (chainId == '0x1') {
      return 'Ethereum'
    }

    if (chainId == '0x3') {
      return 'Ropsten'
    }

    if (chainId == '0x4') {
      return 'Rinkeby'
    }

    if (chainId == '0x5') {
      return 'Goerli'
    }

    if (chainId == '0x2a') {
      return 'Kovan'
    }

    else {
      return 'unknown'
    }
  }
  

}
