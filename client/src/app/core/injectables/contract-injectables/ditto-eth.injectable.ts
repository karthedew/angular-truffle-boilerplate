import { Inject, Injectable } from "@angular/core";
import { Contract, ethers, providers } from "ethers";

// --- THE CONTRACT DATA ---
import * as DittoEthContract from '../../../artifacts/abis/DittoEth.json';
import { MetaMaskProvider } from "../ethers/ethers.injectable";

@Injectable({
    providedIn: 'root'
})
export class DittoEthInjectable extends Contract {

    constructor(
        @Inject(MetaMaskProvider) provider: providers.Web3Provider
    ) {
        // --- Contract Address ---
        const dittoEthAddress = "";    // This should come from one of the environment files.

        // --- MetaMask Signer ---
        const signer = provider.getSigner();

        // --- Ethers Contract Class Initialized Parameters ---
        super(dittoEthAddress, DittoEthContract.abi, signer);
    }
}