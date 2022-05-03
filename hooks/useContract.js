import { useState } from "react";
import useWeb3 from "./useWeb3";
import monsterSuitContract from "../contracts/contractAbi.json";

const useContract = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nftInfos, setNftInfos] = useState({
    name: "",
    description: "",
  });
  const { contract } = useWeb3({
    contractABI: monsterSuitContract.abi,
    contractAddress: monsterSuitContract.address,
  });

  const searchNFTByAddress = async (address) => {
    try {
      setLoading(true);
      const list = [];
      const balanceOf = await contract.methods.balanceOf(address).call();
      const nftName = await contract.methods.name().call();

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
      }

      if (list.length) {
        const nft = list[0];
        setNfts(list);
        setNftInfos({
          name: nftName,
          description: nft.description,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return { searchNFTByAddress, nfts, loading, nftInfos };
};

export default useContract;
