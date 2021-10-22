import { search } from "kaa-scrapper";
import { Gogo } from "gogo-site-scrapper";

const gogo = new Gogo("https://gogoanime.pe");

export default async function getAnime(req, res) {
    const result = await combiner(req.query.q);
    res.status(200).json(JSON.stringify(result, null, "\t"));
}

async function combiner(query) {
    const kaa = await getKAAAnime(query);
    const gogo = await getGoGoAnime(query);
    const res = {
        kaa: kaa,
        gogo: gogo,
    }
    return res;
}
async function getKAAAnime(query) {
    const result = await search(query);
    return result;
}

async function getGoGoAnime(query) {
    const result = await gogo.searchAnime(query);
    return result;
}