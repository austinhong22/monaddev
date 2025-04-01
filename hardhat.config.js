require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const DEFAULT_COMPILER_SETTINGS = {
  version: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  metadata: {
    bytecodeHash: "none",
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    monad: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
