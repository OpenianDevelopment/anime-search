import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GogoSearchResult, KAASearchResult } from "../assets/ts";
import AnimeCard from "../assets/components/animeCard";

function Search({ dark }) {
    const route = useRouter();
    const [anime, setAnime] = useState({
        kaa: [] as KAASearchResult[],
        gogo: [] as GogoSearchResult[],
    });

    useEffect(() => {
        axios.get(`/api/getanime?q=${route.query.q}`).then((res) => {
            setAnime(res.data);
            console.log(route.query.q);
        });
    }, [route.query.q]);

    return (
        <div>
            <Head>
                <title>{`Search Result: ${route.query.q} - The Anime Search`}</title>
            </Head>
            <main className="flex flex-col justify-center items-center min-h-screen p-2 sm:ml-2">
                <h1 className="text-3xl my-5">
                    Search Result From: KickAssAnime
                </h1>
                    {anime.kaa.length > 1 ? (
                        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                            {anime.kaa.map((d) => {
                                return (
                                    <AnimeCard
                                        data={d}
                                        source="kaa"
                                        dark={dark}
                                        key={d.slug_id}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        "No Anime Found"
                    )}
                <h1 className="text-3xl my-5">Search Result From: GoGoAnime</h1>

                {anime.gogo.length > 1 ? (
                    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {anime.gogo.map((d) => {
                            return (
                                <AnimeCard
                                    data={d}
                                    source="gogo"
                                    dark={dark}
                                    key={d.url}
                                />
                            );
                        })}
                    </div>
                ) : (
                    "No Anime Found"
                )}
            </main>
        </div>
    );
}
export default Search;
