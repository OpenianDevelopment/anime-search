import "tailwindcss/tailwind.css";
import { ThemeProvider } from "styled-components";
import { createRef, useState, useEffect } from "react";
import useDarkMode from "use-dark-mode";
import { light, dark, Global } from "../assets/ts/Theme.config";
import type { AppProps } from "next/app";
import React from "react";
import { useRouter } from "next/router";
import { cleanQuery } from "../assets/ts/functions";

function MyApp({ Component, pageProps }: AppProps) {
    const route = useRouter();
    const [isUsed, setUsed] = useState(false);
    const [isIndex, setIsIndex] = useState(true);
    const [QueryQ, setQueryQ] = useState<string>();
    const darkmode = useDarkMode(true);
    const theme = darkmode.value ? dark : light;

    useEffect(() => {
        setUsed(true);
        if (/\/search/.test(window.location.href)) {
            setIsIndex(false);
        }
    }, []);
    useEffect(() => {
        setQueryQ(route.query.q as string);
    }, [route.query.q]);

    const searchString = createRef() as any;
    function searchedAnimeButton() {
        try {
            if (
                searchString.current &&
                searchString.current.value?.toString()?.length <= 3
            )
                return alert("Search length has to be 3+ charcters");
            window.location.href = `${window.origin}/search?q=${searchString.current.value}`;
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
        bgcolor: darkmode.value ? " bg-white " : " bg-black ",
        txtcolor: darkmode.value ? " text-gray-800 " : " text-gray-300 ",
        btnhovercolor: darkmode.value
            ? " hover:bg-red-600 "
            : " hover:bg-red-800 ",
    };
    return (
        <ThemeProvider theme={theme}>
            <Global />
            <ul className="flex justify-center">
                {isIndex ? (
                    " "
                ) : (
                    <li className="mr-2 p-3">
                        <div
                            className={
                                searchBar.bgcolor +
                                "flex items-center rounded-full shadow-xl"
                            }
                        >
                            <input
                                ref={searchString}
                                className={
                                    searchBar.txtcolor +
                                    searchBar.bgcolor +
                                    "rounded-l-full w-full py-2 px-3 leading-tight focus:outline-none"
                                }
                                id="search"
                                type="text"
                                placeholder={cleanQuery(QueryQ)}
                            ></input>

                            <div className={"p-2"}>
                                {SubmitByEnter()}
                                <button
                                    onClick={searchedAnimeButton}
                                    className={
                                        searchBar.btnhovercolor +
                                        "rounded-full focus:outline-none w-12 flex items-center justify-center"
                                    }
                                    style={{ transition: "all 250ms linear" }}
                                >
                                    🔍
                                </button>
                            </div>
                        </div>
                    </li>
                )}
                <li className="ml-2 p-5">
                    <button onClick={darkmode.toggle}>
                        {darkmode.value ? "☀️" : "🌙"}
                    </button>
                </li>
            </ul>
            {isUsed && <Component dark={darkmode.value} {...pageProps} />}
        </ThemeProvider>
    );
}

export default MyApp;
