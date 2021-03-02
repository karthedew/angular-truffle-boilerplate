import { Injectable } from '@angular/core';
import { DittoEthInjectable } from '../../injectables/contract-injectables/ditto-eth.injectable';

@Injectable({
  providedIn: 'root'
})
export class DittoEthService {

  constructor(
    private dittoEthInjectable: DittoEthInjectable
  ) {
    // 42 is the Kovan Network
    // 7776 is the Truffle Network
  }

  async name(): Promise<string> {
    return await this.dittoEthInjectable.name();
  }

  async balanceOf(addrs:string): Promise<string> {
    return await this.dittoEthInjectable.addressOf(addrs);
  }

  // deposit()


  // widthdraw()


  // balanceOf()
}
