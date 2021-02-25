import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from '../../services/wallet-connect/wallet-connect.service';

import Web3Modal from "web3modal";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private walletConnectService: WalletConnectService
  ) { }

  ngOnInit(): void {
    let accnts = this.walletConnectService.GetAccounts();

    console.log('The available accounts: ', accnts)
  }

  connectWallet() {
    console.log('We are connecting a wallet');
    this.walletConnectService.connectAccount();
  }

}
