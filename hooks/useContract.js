import { useState } from "react";
import useWeb3 from "./useWeb3";
import monsterSuitContract from "../contracts/contractAbi.json";

const contractAddress = "0x5267F4183868F0BFF6f95B7Ba70c9f0193E645C0";
const useContract = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contract } = useWeb3({
    contractABI: monsterSuitContract.abi,
    contractAddress,
  });

  const searchNFTByAddress = async (address) => {
    try {
      setLoading(true);
      const list = [];
      const balanceOf = await contract.methods.balanceOf(address).call();

      for (let i = 0; i < balanceOf; i++) {
        const tokenId = await contract.methods
          .tokenOfOwnerByIndex(address, i)
          .call();

        let tokenURI = await contract.methods.tokenURI(tokenId).call();

        if (tokenURI.startsWith("ipfs://")) {
          tokenURI = `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`;
        }

        const response = await (await fetch(tokenURI)).json();

        list.push({
          id: i,
          ...response,
        });

        setLoading(false);
      }
      setNfts(list);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return { searchNFTByAddress, nfts, loading };
};

export default useContract;
