import { generateObject } from "ai";
import { z } from "zod";
import { model } from "./model/ollama";

const mapCoordinate = z.object({
  coords: z.array(
    z.object({
      lat: z.number().describe("Latitude"),
      lon: z.number().describe("Longitude"),
      name: z.string().describe("Name of the place"),
      description: z.string().describe("Description of the place"),
    })
  ),
  center: z.object({
    lat: z.number().describe("Latitude of the center"),
    lon: z.number().describe("Longitude of the center"),
  }),
});

export const generateMapCoordinate = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    prompt,
    schema: mapCoordinate,
    system:
      "You are pointing to interesting coordinates on a map." +
      "The location should be a real place and be one of the top 100 places in the world." +
      "The name and description should be a real place and be one of the top 100 places in the world." +
      "You will provide 3 coordinates unless otherwise asked.",
  });

  return object;
};
