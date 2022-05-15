import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../utils/prisma";

const generateRandomSongChoiceIds = async () => {
  const numberOfSongs = await prisma.song.count();
  const generateRandomIndex = () => Math.ceil(Math.random() * numberOfSongs);
  const firstIndex = generateRandomIndex();
  let lastIndex: number;
  do {
    lastIndex = generateRandomIndex();
  } while (firstIndex === lastIndex);
  return [firstIndex, lastIndex];
};

export const appRouter = trpc
  .router()
  .query("get-song-choices", {
    async resolve() {
      const randomSongChoiceIds = await generateRandomSongChoiceIds();

      const songChoices = await prisma.song.findMany({
        where: {
          id: { in: randomSongChoiceIds },
        },
      });

      return songChoices;
    },
  })
  .mutation("vote-for-song", {
    input: z.object({
      id: z.number(),
      songIds: z.array(z.number()),
    }),

    async resolve({ input: { id, songIds } }) {
      await prisma.song.update({
        where: { id },
        data: { votes: { increment: 1 } },
      });

      const songs = await prisma.song.findMany({
        where: { id: { in: songIds } },
        select: {
          votes: true,
        },
      });

      const votes = songs.map(({ votes }) => votes);
      return votes;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
