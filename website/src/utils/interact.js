import {pinJSONToIPFS} from './pinata.js';
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const url = process.env.REACT_APP_IPFS_URL;
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const web3 = createAlchemyWeb3(alchemyKey);
const name = "Builders Week 2023 Participant"
require('dotenv').config();

const contractABI = require('../contract-abi.json')
const contractAddress = "0x07D3Fb85b22b4AA1dd68820263403fe0D400945e";

export const connectWallet = async () => {
	if (window.ethereum) {
	  try {
		const addressArray = await window.ethereum.request({
		  method: "eth_requestAccounts",
		});
		const targetNetworkId = '0x89';
		const currentChainId = await window.ethereum.request({
			method: "eth_chainId",
		});
		if (targetNetworkId != currentChainId) {
				return {
					address: "",
					status: (
						<span>
							<p>
								{" "}
								↪{" "}
								<a target="_blank" href={`https://www.alchemy.com/chain-connect/endpoints/polygon-rpc-polygon-pos`}>
									Please switch to the Polygon Mainnet network!
								</a>
							</p>
						</span>
					)
				}
			}
		const obj = {
		status: "⬆ Write your name in the text-field above.",
		address: addressArray[0],
		};
		return obj;
	  } catch (err) {
		return {
		  address: "",
		  status: "😥 " + err.message,
		};
	  }
	} else {
	  return {
		address: "",
		status: (
		  <span>
			<p>
			  {" "}
			  🦊{" "}
			  <a target="_blank" href={`https://metamask.io/download.html`}>
				You must install Metamask in your browser.
			  </a>
			</p>
		  </span>
		),
	  };
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
	  try {
		const addressArray = await window.ethereum.request({
		  method: "eth_accounts",
		});
		if (addressArray.length > 0) {
		  return {
			address: addressArray[0],
			status: "⬆ Write your name in the text-field above.",
		  };
		} else {
		  return {
			address: "",
			status: "🦊 Connect to Metamask using the top button.",
		  };
		}
	  } catch (err) {
		return {
		  address: "",
		  status: "😥 " + err.message,
		};
	  }
	} else {
	  return {
		address: "",
		status: (
		  <span>
			<p>
			  {" "}
			  🦊{" "}
			  <a target="_blank" href={`https://metamask.io/download.html`}>
				You must install Metamask in your browser.
			  </a>
			</p>
		  </span>
		),
	  };
	}
};

// export const mintNFT = async(url, name, description) => {
export const mintNFT = async(description) => {

	// Check network and force change
	const targetNetworkId = '0x89';
	const currentChainId = await window.ethereum.request({
		method: "eth_chainId",
	});
	if (targetNetworkId != currentChainId) {
		return {
			address: "",
			status: (
				<span>
					<p>
						{" "}
						↪{" "}
						<a target="_blank" href={`https://www.alchemy.com/chain-connect/endpoints/polygon-rpc-polygon-pos`}>
							Please switch to the Polygon Mainnet network!
						</a>
					</p>
				</span>
			)
		}
	}

    // Error handling
    if ((description.trim() == "")) { 
        return {
            success: false,
            status: "⚠Please make sure you add your name before minting.",
        }
    }

    // Make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    // Pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  

    // Load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

    // Set up Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.mintNFT(tokenURI).encodeABI() //make call to NFT smart contract 
    };

    // Sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: (
				<span>
				  <p>
					{" "}
					↪{" "}
					<a target="_blank" href={`https://polygonscan.com/tx/${txHash}`}>
					  Check out your transaction on Polygonscan
					</a>
				  </p>
				</span>
			  )
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
};