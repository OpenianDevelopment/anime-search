import Head from "next/head";
import Image from "next/image";
import * as logo from "../public/logo.png";
import { createRef } from "react";
import React from "react";

export default function Home({ dark }) {
    const searchString = createRef() as any;
    function searchedAnimeButton() {
        try {
            if (
                searchString.current &&
                searchString.current.value?.toString()?.length <= 3
            )
                return alert("Search length has to be 3+ charcters");
            window.location.href = `${window.location.href}/search?q=${searchString.current.value}`;
        } catch (err) {
            return;
        }
    }
    function SubmitByEnter() {
        document.addEventListener("keydown", function (k) {
            if (k.code === "Enter") {
                searchedAnimeButton();
            }
        });
    }
    const searchBar = {
        bgcolor: dark ? " bg-white " : " bg-black ",
        txtcolor: dark ? " text-gray-800 " : " text-gray-300 ",
        btnhovercolor: dark ? " hover:bg-red-600 " : " hover:bg-red-800 ",
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>The Anime Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-start mt-24 w-full flex-1 px-20 text-center">
                <div className="p-8">
                    <div
                        className={
                            searchBar.bgcolor +
                            " flex items-center rounded-full shadow-xl"
                        }
                    >
                        <input
                            ref={searchString}
                            className={
                                searchBar.txtcolor +
                                searchBar.bgcolor +
                                "rounded-l-full w-full py-4 px-6 leading-tight focus:outline-none"
                            }
                            id="search"
                            type="text"
                            placeholder="Search"
                        ></input>

                        <div className={"p-2"}>
                            {SubmitByEnter()}
                            <button
                                id="submit-btn"
                                onClick={searchedAnimeButton}
                                className={
                                    searchBar.btnhovercolor +
                                    "text-white rounded-full p-2 focus:outline-none w-12 h-12 flex items-center justify-center"
                                }
                                style={{ transition: "all 250ms linear" }}
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                </div>
                <Image src={logo} />
            </main>
        </div>
    );
}
