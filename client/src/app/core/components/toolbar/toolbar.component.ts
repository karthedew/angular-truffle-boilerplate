import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from '../../services/wallet-connect/wallet-connect.service';

import Web3Modal from "web3modal";
import Web3 from 'web3';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // --- Local Variables ---
  loggedIn:       boolean = false;
  currentAddress: string;

  constructor(
    private walletConnectService: WalletConnectService
  ) {
    // --- Check MetaMask Login ---
    this.walletConnectService.checkMetaMaskConnection();
    this.walletConnectService.isConnected$.subscribe(
      (res:any) => this.loggedIn = res)
    this.walletConnectService.walletAccounts$.subscribe(
      (res:string[]) => this.currentAddress = res[0])
  }

  ngOnInit(): void { }

  // ======================
  // --- Public Methods ---
  // ======================

  public connectWallet(): void {
    this.walletConnectService.connectAccount();
    this.walletConnectService.checkMetaMaskConnection();
  }

  public copyAddress() {
    alert(`Copied ${this.currentAddress} to Clipboard`);
  }

  public async logout() {
    this.walletConnectService.logout();
  }

}
