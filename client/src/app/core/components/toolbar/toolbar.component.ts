import { Component, OnInit } from '@angular/core';
import { WalletConnectService } from '../../services/wallet-connect/wallet-connect.service';

import Web3Modal from "web3modal";
import Web3 from 'web3';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // --- Local Variables ---
  loggedIn:       boolean = false;
  currentAddress: string;
  currentRoute: string;
  chainId: string;

  walletInfoRoute: string = 'blue';
  contractRoute: string = "primary";
  myStyle: string = 'myStyle fromLeft'


  constructor(
    private walletConnectService: WalletConnectService,
    private router: Router
  ) {
    // --- Check MetaMask Login ---
    this.walletConnectService.checkMetaMaskConnection();      // Check if user is already connected with MetaMask
    this.walletConnectService.isConnected$.subscribe(         // Subscribe to get the loggedIn boolean
      (res:any) => this.loggedIn = res)
    this.walletConnectService.walletAccounts$.subscribe(      // Subscribe to get the wallet address
      (res:string[]) => this.currentAddress = res[0])
    this.walletConnectService.chainId$.subscribe(             // Subscribe to get the chainId
      (res:string) => this.chainId = res)
    
    // --- Get the Route for Styling ---
    this.styledRoute();
    
    
    // --- Keep Track of MetaMask Changes ---

    // If <address> is changed
    window.ethereum.on('accountsChanged', (accounts) => {
      this.walletConnectService.changeAccounts(accounts);
    })

    // If <chainId> is changed.
    window.ethereum.on('chainChanged', (chainId: any) => {
      alert(chainId);
      window.location.reload();
    });
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

  // =======================
  // --- Private Methods ---
  // =======================
  private styledRoute(): void {
    this.router.events.subscribe(routeEvent => {
      // console.log('The route change: ', rut);
      if(routeEvent instanceof NavigationEnd) {
        console.log(routeEvent.url)
        this.currentRoute = routeEvent.url;
        if (routeEvent.url === '/') {
          this.contractRoute = 'accent';
          this.myStyle = 'myStyle';
        }

        if (routeEvent.url == '/walletinfo') {
          this.myStyle = 'myStyle1';
        }
      }
    })
  }

}
