# Builders Week 2023 NFT dApp - Smart Contract

This project was developed during the Builders Week event held in Lisbon from 5-9 June.
###
The goal was to create a simple dApp that allows a user to mint a NFT related to the event. This is divided into two parts, the Smart Contract to interact with the Polygon blockchain and the Website to allow the interaction between the user and the Smart Contract.
###
The Website was deployed on Netlify and it simply allows you to connect a Metamask wallet (to Polygon network), input your name/nickname that will be engraved in the NFT as metadata and mint the NFT to your address.
###
This is divided into two parts, the [Smart Contract](https://github.com/josevazf/BuildersWeek-Minter_Contract) to interact with the Polygon blockchain and the [Website](https://github.com/josevazf/BuildersWeek-Minter_Website) to allow the interaction between the user and the Smart Contract.
###
Contract: https://polygonscan.com/address/0x07d3fb85b22b4aa1dd68820263403fe0d400945e
###
Website: https://buildersweek2023.netlify.app/
#
If you would like to reuse this Contract first you need to install [npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Install and initiate a [Metamask wallet](https://wiki.polygon.technology/docs/develop/metamask/hello/) and get an API key from an RPC provider like [Alchemy](https://docs.alchemy.com/docs/alchemy-quickstart-guide) or [Infura](https://www.infura.io/).
Then on the cloned folder:
###
Install Hardhat (it will allow to compile and deploy the contract):
```shell
npm install --save-dev hardhat
```
Install the OpenZeppelin contracts package. This will give access to ERC721 implementations (the standard for NFTs) on top of which the contract is built:
```shell
npm install @openzeppelin/contracts --save
```
Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (from Metamask account) and API key (from Alchemy or Infura) in an environment file.
Install the dotenv package by running:
```shell
npm install dotenv --save
```
Create a file called `.env` and paste your API key and private key like so:
```shell
API_URL = "https://your-api-key-url"
PRIVATE_KEY = "your-metamask-private-key"
```
###
To deploy the contract run:
```shell
npx hardhat run scripts/deploy.js --network polygon
```
###
Notice that in this case the contract was deployd to Polygon Mainnet, you can change the network to another EVM compatible by updating the `hardhat.config.js` file accordingly and running the deploy command with the correct network.
After deployment you should see something like this:
```shell
Contract deployed to address: 0x09d3gb85b22b4aa1dd68820363403fe0d400945e
```
The address will be used in the Website interaction.
