// const ganache = require('ganache-cli');
// const Web3 = require('web3');

const MyToken = artifacts.require("myToken");


contract('MyToken', (accounts) => {

    const owner = accounts[0];
    var myTokenInstance;
    // var web3;

    before('Setup Contract', async function() {
        myTokenInstance = await MyToken.deployed();
        // web3 = new Web3(ganache.provider());
    })

    // beforeEach('Setup global variables', async function() {
    //     const owner = accounts[0];
    // })

    it('should have a token of 1000 coins', async () => {
        // const myTokenInstance = await MyToken.deployed();
        const totalSupply = await myTokenInstance.totalSupply.call();

        assert.equal(totalSupply, 1000, 'The balance should be equal to 1000')
        assert.equal(owner, accounts[0], 'Should have the same owner')
    })

    it('Total supply of the original account owner', async () => {
        var balance = await myTokenInstance.balanceOf(owner);

        assert.equal(balance, 1000, 'Owner should have the full balance.')
    })

    it('Send to the mint() function', async () => {

        let sendAmount = web3.utils.toWei('10', 'ether');

        let initialAccountBalance = await web3.eth.getBalance(accounts[1]);

        // --- SEND MONEY TO THE DEPOSIT FUNCTION ---
        let tx = await myTokenInstance.deposit({
            from: accounts[1], 
            value: sendAmount
        });

        // Get the gas used and convert GWEI TO WEI
        let gasUsed = tx.receipt.gasUsed * 2 * 10000000000;

        // --- GET THE ACTUAL ACCOUNT BALANCE ---
        var acct1Balance = await web3.eth.getBalance(accounts[1]);
        const acctEther = web3.utils.fromWei(acct1Balance, 'ether');

        // --- CALCULATE THE REDUCED AMOUNT ---
        let calc = initialAccountBalance - sendAmount - gasUsed;
        let finalValue = web3.utils.fromWei(calc.toString(), 'ether');

        assert.equal(finalValue, acctEther, 'The balances are not equal')
    })

    it('Check token balance', async () => {
        let bal = await myTokenInstance.balanceOf(accounts[1]);

        let crtBal = await web3.eth.getBalance(myTokenInstance.address);

        let actTokenBal = web3.utils.fromWei(bal.toString(), 'ether');
    })
})