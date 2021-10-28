const RandomNumberConsumer = artifacts.require("RandomNumberConsumer");
const LinkToken = artifacts.require("LinkToken");
const Lottery = artifacts.require("Lottery");

module.exports = async (deployer) => {
  await deployer.deploy(RandomNumberConsumer);
  const random = await RandomNumberConsumer.deployed();

  await deployer.deploy(LinkToken);
  const linkToken = await LinkToken.deployed();

  await deployer.deploy(Lottery);
  const lottery = await Lottery.deployed();
};
