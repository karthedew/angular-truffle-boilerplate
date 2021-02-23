import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletInformationComponent } from './pages/wallet-information/wallet-information.component';


const routes: Routes = [
  {
    path: 'walletinfo',
    component: WalletInformationComponent,
    data: {
      title: 'Wallet Information Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
