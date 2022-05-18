import { readFileSync } from "fs";
import { prisma } from "../src/utils/prisma";

async function push() {
  const content = readFileSync("../data/songs.json").toString();
  const data = JSON.parse(content);
  for (const album of Object.keys(data)) {
    const songs: string[] = data[album];
    await prisma.song.createMany({
      data: songs.map((title) => ({
        title,
        album,
        votes: 0,
      })),
    });
  }
}

push();
