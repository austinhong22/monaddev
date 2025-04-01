const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  await hre.run("compile");
  const artifact = await hre.artifacts.readArtifact("Split50");
  const abi = artifact.abi;
  const bytecode = artifact.bytecode;

  const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );
  const wallet2 = new ethers.Wallet(
    process.env.PRIVATE_KEY2,
    provider
  );
  const balance = await provider.getBalance(wallet.address);
  const deployer = wallet.address;

  console.log(
    "Deploying contracts with the account:",
    deployer.address,
    balance
  );

  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy(deployer, wallet2.address);
  console.log(
    contract.deploymentTransaction().hash,
  );
  console.log("Contract deployed to:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });