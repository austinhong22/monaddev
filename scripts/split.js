const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );

    const artifact = await hre.artifacts.readArtifact("Split50");
    const abi = artifact.abi;

    const contract = new ethers.Contract("0xC27f25d291C9f23C8D0A05EF6613638cdf7E36e4", abi, wallet);

    const tx = await contract.split({ value: ethers.parseEther("0.01") });
    console.log(tx.hash);

    console.log("Split 0.01 ether");
    
    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });