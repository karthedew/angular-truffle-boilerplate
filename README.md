# Angular Truffle Boilerplate Project
This boilerplate project will get you up and running with smart contract (Truffle) and client-side (Angular) developement.

Here are some key features that this box includes:

    - Truffle Framework (v5.1.67)
    - Angular (v11.2.1)
    - Chainlink
    - The Graph

## Quick Start

The first thing is to install the client node packages.

```
cd client
npm install
```



## Potential Issues

You may run into a ```Module not found: Error: Can't resolve 'crypto' in ...``` This could also include ```Can't resolve 'stream' in ...```. 

The problem stems from the *browser.js* file in the @angular-devkit. The solution is simple: 

    1. Open the file node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js
    2. Change node: false to node: { crypto: true, stream: true }