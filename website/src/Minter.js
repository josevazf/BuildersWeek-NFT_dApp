import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";
import { SocialIcon } from 'react-social-icons';

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  function addWalletListener() {
	if (window.ethereum) {
	  window.ethereum.on("accountsChanged", (accounts) => {
		if (accounts.length > 0) {
		  setWallet(accounts[0]);
		  setStatus("⬆ Write your name in the text-field above.");
		} else {
		  setWallet("");
		  setStatus("🦊 Connect to Metamask using the top button.");
		}
	  });
	} else {
	  setStatus(
		<p>
		  {" "}
		  🦊{" "}
		  <a target="_blank" href={`https://metamask.io/download.html`}>
			You must install Metamask in your browser.
		  </a>
		</p>
	  );
	}
  }

  useEffect(async () => {
	const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status);

	addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
	const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
	
	const { status } = await mintNFT(description);
    setStatus(status);
  };

  return (
    <div className="Minter">
	  <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>  
	  <hr></hr>

      <img className="frame_logo" src="../frame_logo_tx.png" alt="Builders Week Logo" width="382" height="166"></img>
      <br></br>
	  <img src="../text_.png" alt="Builders Week Logo" width="270" height="29"></img>
      <br></br>
	  <br></br>
	  <br></br>
	  
      <p>
        Simply add your name to the description and then press "Mint NFT".
      </p>
      <form>
        <input
          type="text"
          placeholder="e.g. Vitalik Buterin"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
	  <br></br>
	  <br></br>
	  <br></br>
	  <hr></hr>
	  <SocialIcon className="icon" url="https://lu.ma/buildersweek" target="_blank" rel="noopener noreferrer" style={{ height: 50, width: 50 }} bgColor="#ffffff"/>
	  &nbsp;
	  <SocialIcon className="icon" url="https://linkedin.com/in/josevazf" target="_blank" rel="noopener noreferrer" alt="LinkedIn" style={{ height: 50, width: 50 }} bgColor="#ffffff"/>
	  &nbsp;
	  <SocialIcon className="icon" url="https://github.com/josevazf" target="_blank" rel="noopener noreferrer" alt="GitHub" style={{ height: 50, width: 50 }} bgColor="#ffffff"/> 
	  &nbsp;
	  <SocialIcon className="icon" url="https://t.me/zguf1070" alt="GitHub" style={{ height: 50, width: 50 }} bgColor="#ffffff" />
	  &nbsp;
	  <a href="https://beta.talentprotocol.com/u/zguf" target="_blank" rel="noopener noreferrer">
		<img className="icon2" src="../talentprotocol_icon.png" alt="Talent Protocol" width="50" height="50"></img>
	  </a>
	</div>
  );
};

export default Minter;
