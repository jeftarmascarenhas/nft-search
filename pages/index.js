/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useContract from "../hooks/useContract";
import Web3 from "web3";

export default function Home() {
  const { searchNFTByAddress, nfts, loading, nftInfos } = useContract();

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const inputSearch = event.target[0];

    if (!Web3.utils.isAddress(inputSearch.value)) {
      alert("Address is not valid");
      return;
    }

    await searchNFTByAddress(inputSearch.value);
    inputSearch.value = "";
  };

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
              placeholder="Your Account Address"
              className="border-0 w-full rounded-full min-h-[50px] p-4 bg-black/20 outline-none hover:shadow-lg transition-shadow ease-linear disabled:bg-gray-600 disabled:cursor-not-allowed appearance-none"
              disabled={loading}
            />
          </form>
        </header>

        {!!nftInfos.name && (
          <div className="p-6 mb-5 rounded-lg bg-purple-700">
            <h3 className="text-lg font-semibold">{nftInfos.name}</h3>
            <p>{nftInfos.description}</p>
          </div>
        )}

        <div className="mb-5 text-gray-400">
          <p>Total items: {nfts.length}</p>
        </div>

        <ul className="grid gap-8 grid-cols-4">
          {nfts.length ? (
            nfts.map((nftItem) => (
              <li key={nftItem.id} className="relative mb-16">
                <img
                  src={nftItem.image}
                  alt="img"
                  className="w-full object-cover rounded-md shadow-md"
                />
                {!!nftItem.name && (
                  <div className="p-2 absolute -bottom-8 -left-6 ">
                    <div className="bg-slate-800/95 p-4 rounded-lg">
                      <h2 className="text-lg font-semibold mb-2">
                        {nftItem.name}
                      </h2>
                    </div>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li className="col-span-4 p-4">
              <h3 className="text-center">
                {loading ? "Looking for NFTs..." : "Search NFTs that you own"}
              </h3>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
