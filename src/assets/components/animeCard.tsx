import React from "react";
import { AnimeData, GogoSearchResult, KAASearchResult } from "../ts";

export default function AnimeCard({ data, source, dark }: AnimeData) {
    const Colors = {
        bg: dark ? " bg-white " : " bg-black ",
        txt: dark ? " text-purple-800 " : " text-purple-300 ",
        btnhover: dark ? " hover:text-red-600 " : " hover:text-red-800 ",
    };
    if (source == "kaa") return DisplayKAA(data as KAASearchResult);
    if (source == "gogo") return DisplayGogo(data as GogoSearchResult);
    return null;
    function DisplayKAA(data: KAASearchResult) {
        return (
            <div
                className={
                    Colors.bg +
                    Colors.txt +
                    "rounded-lg shadow-lg w-[300px] max-h-[800px]"
                }
            >
                <img
                    src={`${data.image}${data.poster}`}
                    alt={`${data.name}-${data.slug_id}`}
                    className="rounded-t-lg"
                    width="100%"
                />
                <div className="p-6">
                    <h2 className="font-bold mb-2 text-2xl">
                        {data.name}
                    </h2>
                    <a
                        href={`https://kickassanime.rs${data.slug}`}
                        className={
                            Colors.btnhover +
                            "flex justify-center underline text-sm"
                        }
                    >
                        Watch
                    </a>
                </div>
            </div>
        );
    }

    function DisplayGogo(data: GogoSearchResult) {
        return (
            <div
                className={
                    Colors.bg +
                    Colors.txt +
                    "rounded-lg shadow-lg w-[300px] max-h-[800px]"
                }
            >
                <img
                    src={data.img}
                    alt={`${data.name}-${data.released}`}
                    className="rounded-t-lg"
                    width="100%"
                />
                <div className="p-6">
                    <h2 className="font-bold mb-2 text-2xl">
                        {data.name}
                    </h2>
                    <a
                        href={data.url}
                        className={
                            Colors.btnhover +
                            "flex justify-center underline text-sm"
                        }
                    >
                        Watch
                    </a>
                </div>
            </div>
        );
    }
}
