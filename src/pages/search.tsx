import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { GogoSearchResult, KAASearchResult } from "../assets/ts";
import AnimeCard from "../components/animeCard";
import LoadingSpin from "../components/loading";

function Search({ dark }) {
    const route = useRouter();
    const [anime, setAnime] = useState({
        notFound: true,
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
            {anime.kaa.length >= 1 || anime.gogo.length >= 1 ? (
                <main className="flex flex-col justify-center items-center min-h-screen p-2 sm:ml-2">
                    <h1 className="text-3xl my-5">
                        Search Result From: KickAssAnime
                    </h1>
                    {
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
                    }
                    <h1 className="text-3xl my-5">
                        Search Result From: GoGoAnime
                    </h1>
                    {
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
                    }
                </main>
            ) : !anime.notFound ? (
                <h1 className="mt-[60%] md:mt-[calc(15%+5rem)] flex justify-center text-3xl my-5">
                    No Anime
                </h1>
            ) : (
                <LoadingSpin dark={dark} />
            )}
        </div>
    );
}
export default Search;
