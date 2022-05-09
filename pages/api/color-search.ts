import type { NextApiRequest, NextApiResponse } from "next";
import Axios from "axios";

const API_RUNS = 3;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { color } = req.query;
  const colorParam = color as string;
  const keywords = generateKeyWordsFromColor(colorParam);

  let results: any[] = [];
  callNearbySearchAPI(keywords[0], colorRef[colorParam].types[0]).then(
    (resp: any) => {
      results = results.concat(resp.data.results);
      res.status(200).json({ results });
    }
  );
};

const callNearbySearchAPI = (keyword: string, type: string) => {
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=40.7346527,-74.0081077&radius=2000&type=${type}&language=en&key=${process.env.MAPS_API_KEY}`;

  return new Promise((resolve, reject) => {
    Axios.get(URL)
      .then(({ data }) => {
        if (data.status == "OK") {
          resolve({ data });
        }
      })
      .catch((err) => {
        reject({ err });
      });
  });
};

const generateKeyWordsFromColor = (color: string) => {
  let keywords: string[] = [];
  while (keywords.length < API_RUNS) {
    const randInd = Math.floor(
      Math.random() * (colorRef[color].keywords.length - 1)
    );
    if (!keywords.includes(colorRef[color].keywords[randInd])) {
      keywords.push(colorRef[color].keywords[randInd]);
    }
  }
  return keywords;
};

export default handler;

type ColorRef = {
  [key: string]: { types: string[]; keywords: string[] };
};

const colorRef: ColorRef = {
  purple: {
    types: ["restaurant", "bar", "lounge", "night_club"],
    keywords: [
      "Exclusive",
      "Swanky",
      "Posh",
      "Chic",
      "Unique",
      "International",
      "Sceney",
      "Rich",
      "Iconic",
      "Fashionable",
      "Dressy",
      "Ritzy",
      "Opulent",
    ],
  },
  blue: {
    types: ["restaurant"],
    keywords: [
      "Airy",
      "Cool",
      "Refined",
      "Sophisticated",
      "Traditional",
      "Classic",
      "Business Lunch",
      "Business Causal",
      "Elegant",
      "Luxurious",
      "Historic",
      "Great service",
      "Fine Dining",
    ],
  },
  yellow: {
    types: ["restaurant"],
    keywords: [
      "Homey",
      "Cheerful",
      "Hearty",
      "Upbeat",
      "Bubbly",
      "Convivial",
      "Informal",
      "Rustic",
      "Retro",
      "Casual",
      "Dynamic",
      "Noisy",
      "Lively",
      "Bustling",
    ],
  },
  orange: {
    types: ["bar"],
    keywords: [
      "Rowdy",
      "Sports Bar",
      "Exciting",
      "Rousing",
      "Dancing",
      "Vivacious",
      "Spirited",
      "Loud",
      "Festivities",
      "Festive",
      "Seductive",
      "Games",
      "Fun",
      "Watering hole",
    ],
  },
  red: {
    types: ["night_club"],
    keywords: [
      "DJ",
      "Dancing",
      "Dark",
      "Disco",
      "Clubby",
      "Club",
      "Lavish",
      "Spacious",
      "Underground",
    ],
  },
  green: {
    types: ["cafe", "bakery"],
    keywords: [
      "Tea and coffee",
      "Relaxed",
      "Healthy",
      "Comfortable",
      "Workspace",
      "Casual",
      "Low-key",
    ],
  },
};
