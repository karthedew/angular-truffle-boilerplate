const DittoEth = artifacts.require("tokens/DittoEth")

module.exports = function(deployer) {
  deployer.deploy(DittoEth);
};