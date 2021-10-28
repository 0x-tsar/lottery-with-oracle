const RandomNumberConsumer = artifacts.require("RandomNumberConsumer");
const LinkToken = artifacts.require("LinkToken");

module.exports = async (deployer) => {
  await deployer.deploy(RandomNumberConsumer);
  const random = await RandomNumberConsumer.deployed();

  await deployer.deploy(LinkToken);
  const linkToken = await LinkToken.deployed();
};
