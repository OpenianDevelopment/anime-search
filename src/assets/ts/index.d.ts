declare global {
  module "*.png" {
    const value: any;
    export default value;
  }
}

export interface GogoSearchResult {
  name: string;
  url: string;
  img: string;
  released: number;
  type: "dub" | "sub";
  linkName: string;
}

export interface KAASearchResult {
  name: string;
  slug: string;
  slug_id: string;
  poster: string;
  image: string;
}

export interface Theme {
  [key: string | null];
}

export interface AnimeData {
  data: GogoSearchResult | KAASearchResult;
  source: "kaa" | "gogo";
  dark: boolean
}
