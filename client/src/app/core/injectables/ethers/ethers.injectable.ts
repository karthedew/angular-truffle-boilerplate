import { InjectionToken } from "@angular/core";
import { ethers, getDefaultProvider, providers } from "ethers";

require("dotenv").config()

const MetaMaskProvider = new InjectionToken<providers.Web3Provider>('MetaMask Connected', {
    providedIn: 'root',
    factory: () => {
        const ethersProvider = new ethers.providers.Web3Provider((window as any).ethereum);
        return ethersProvider
    }
})

const KovanWebSocketProvider = new InjectionToken<providers.WebSocketProvider>('Truffle Ethereum RPC Provider', {
    providedIn: 'root',
    factory: () => new providers.WebSocketProvider(process.env.KOVAN_WSS_URL)
})