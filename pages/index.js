import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useContract from "../hooks/useContract";
import Web3 from "web3";

export default function Home() {
  const { searchNFTByAddress, nfts, loading } = useContract();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const address = event.target[0].value;

    if (!Web3.utils.isAddress(address)) {
      alert("Address is not valid");
      return;
    }

    searchNFTByAddress(address);
  };

  console.log(nfts.name);

  return (
    <>
      <Head>
        <title>NFT Choose - NFT Search</title>
      </Head>
      <div className="p-10">
        <header>
          <Link href="https://www.youtube.com/channel/UCCyxBPhe_gCIFx85BLXsUMA">
            <a>
              <img
                className="w-full max-w-[180px]"
                src="/logo.png"
                alt="NFT Choose"
              />
            </a>
          </Link>
          <form className="my-6" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder={!loading ? "Address" : "Loading NFTs..."}
              className="border-0 w-full rounded-full min-h-[50px] p-4 bg-black/20 outline-none hover:shadow-lg transition-shadow ease-linear disabled:bg-gray-600 disabled:cursor-not-allowed appearance-none"
              disabled={loading}
            />
          </form>
        </header>
        <ul className="grid gap-8 grid-cols-4">
          {nfts.length ? (
            nfts.map((nftItem) => (
              <li key={nftItem.id} className="relative mb-16">
                <img
                  src="https://lh3.googleusercontent.com/6iizzY2hGhxSKQZhBU5mfjpBf5GSP4vcgSQvV_pdywxHCvFf5seuVxbKv11lT7yXhhKANSFawRXtxX8V00cTNBWh2izvhHmKeNZ3GQ=w600"
                  alt="img"
                  className="w-full object-cover rounded-md shadow-md"
                />
                {!!nftItem.name && (
                  <div className="p-2 absolute -bottom-20 -left-6 ">
                    <div className="bg-slate-800/95 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">
                        {nftItem.name}
                      </h2>
                      {!!nftItem.description && (
                        <h3 className="text-sm">{nftItem.description}</h3>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="col-span-4 p-4">
              <h3 className="text-center">NFTs not found</h3>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
