// TODO: 

const MyToken = artifacts.require("myToken");


/**
 * GROUP #1: Basic Contract Features
 * 
 * 
 * Test Cases:
 * 
 *  - Case #1
 *      > The ``_totalSupply`` of the initial contract release should be 0
 *  - Case #2
 *      > The ``balance`` of the contract should be 0 when deployed.
 */
contract('[myToken] Basic Contract Features', (accounts) => {

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

    it('Case #1: _totalSupply should be equal to 0', async () => {
        // const myTokenInstance = await MyToken.deployed();
        const totalSupply = await myTokenInstance.totalSupply.call();

        assert.equal(totalSupply, 0, 'The balance should be equal to 1000')
        assert.equal(owner, accounts[0], 'Should have the same owner')
    })

    it('Case #2: balance of owner should be 0', async () => {
        var balance = await myTokenInstance.balanceOf(owner);

        assert.equal(balance, 0, 'Owner should have the full balance.')
    })
    
})



/**
 * GROUP #2:  deposit() 
 * 
 * 
 * Test Cases:
 * 
 *  - Case #1
 *      > Test requirement, cannot transfer from the zero address.
 *  - Case #2 
 *      > Test requirement, cannot request more than the available 
 *                          smart contract has available in it's funds.
 *  - Case #3
 *      > Test requirement, cannot send / request withdrawl of more tokens
 *                          than the sender has in their account.
 */
contract('[myToken] deposit() function', (accounts) => {

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

    it('Case #1: Send to the mint() function', async () => {

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

    it('Case #2: Check token balance', async () => {
        let bal = await myTokenInstance.balanceOf(accounts[1]);

        let crtBal = await web3.eth.getBalance(myTokenInstance.address);

        let actTokenBal = web3.utils.fromWei(bal.toString(), 'ether');
    })

})




/**
 * withdraw()
 * 
 * GROUP #3:
 * 
 *  - Case #1
 *      > Test requirement, cannot transfer from the zero address.
 *  - Case #2 
 *      > Test requirement, cannot request more than the available 
 *                          smart contract has available in it's funds.
 *  - Case #3
 *      > Test requirement, cannot send / request withdrawl of more tokens
 *                          than the sender has in their account.
 */
contract('[myToken] withdraw() function', (accounts) => {

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

    it('Case #1: Testing the withdraw() function', async () => {
        let bal = await myTokenInstance.balanceOf(accounts[1]);

        let crtBal = await web3.eth.getBalance(myTokenInstance.address);

        let actTokenBal = web3.utils.fromWei(bal.toString(), 'ether');
    })

})