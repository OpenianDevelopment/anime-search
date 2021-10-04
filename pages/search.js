import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import {useEffect, useState} from "react";
function Search() {
    const route = useRouter();
    const [anime, setAnime] = useState({
        kaa:[],
        gogo: []
    });
    useEffect(()=>{
        axios.get(`https://tas.openian.dev/api/getanime?q=${route.query.q}`).then(res=>{
            setAnime(res.data);
            console.log(route.query.q);
        })
    },[route.query.q]);
    return (
        <div>
            <Head>
                <title>{`Search Result: ${route.query.q} - The Anime Search`}</title>
                <link rel="stylesheet" href="search.css" />
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen py-2">

                    <h1 className="text-3xl">Search Result From: KickAssAnime</h1>
                    <div className="card_container">
                        {anime.kaa.map(anime=>{
                            return (<div className="card">
                                <a href={`https://kickassanime.rs/${anime.slug}`}>
                                    <img src={`${anime.image}${anime.poster}`}
                                         className="card_image" alt="image" />
                                    <h3 className="card_title">{anime.name}</h3>
                                </a>
                            </div>)
                        })}
                    </div>


                    <h1 className="text-3xl">Search Result From: GoGoAnime</h1>
                    <div className="card_container">
                        {anime.gogo.map(anime=>{
                            return (<div className="card">
                                <a href={anime.url}>
                                    <img src={anime.img}
                                         className="card_image" alt="image" />
                                    <h3 className="card_title">{anime.name}</h3>
                                </a>
                            </div>)
                        })}
                    </div>





            </main>
        </div>
    );
}
export default Search;
