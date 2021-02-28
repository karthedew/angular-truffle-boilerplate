const MyToken = artifacts.require("tokens/myToken")

module.exports = function(deployer) {
  deployer.deploy(MyToken);
};