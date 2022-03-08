import type { NextApiRequest, NextApiResponse } from "next";
import { search } from "kaa-scrapper";
import { Gogo } from "gogo-site-scrapper";
import type { KAASearchResult, GogoSearchResult } from "../../assets/ts";

const gogo = new Gogo("https://gogoanime.pe");

export default async function getAnime(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await combiner(req.query.q as string);
  res.status(200).json(JSON.stringify(result, null, "\t"));
}

async function combiner(query: string) {
  const kaa: KAASearchResult | KAASearchResult[] = await getKAAAnime(query);
  const gogo: GogoSearchResult | GogoSearchResult[] = await getGoGoAnime(query);
  const res = {
    kaa: kaa,
    gogo: gogo,
  };
  return res;
}
async function getKAAAnime(query: string) {
  const result = await search(query);
  return result;
}

async function getGoGoAnime(query: string) {
  const result = await gogo.searchAnime(query);
  return result;
}
