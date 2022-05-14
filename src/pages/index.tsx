import { Song } from "@prisma/client";
import type { NextPage } from "next";
import Router from "next/router";
import { DAY_IN_MS } from "../utils/constants";
import { trpc } from "../utils/trpc";

interface ISongChoice {
  onClick: (songId: number) => void;
  song: Song;
}

const SongChoice: React.FC<ISongChoice> = ({ onClick, song }) => {
  const { title, album, id } = song;
  return (
    <div
      onClick={() => onClick(id)}
      className="bg-cover bg-no-repeat h-full w-1/2 relative flex justify-center items-center text-white text-3xl cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(rgba(100, 116, 139, 0.7), rgba(100, 116, 139, 0.7)), url('img/${album}.jpeg')`,
      }}
    >
      {title}
    </div>
  );
};

const Index: NextPage = () => {
  const { isLoading, data: songChoices } = trpc.useQuery(["get-song-choices"], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: DAY_IN_MS,
  });
  const voteForSongMutation = trpc.useMutation("vote-for-song");

  const onClick = (songId: number) => {
    voteForSongMutation.mutate(
      {
        id: songId,
        songIds: songChoices?.map(({ id }) => id) as number[],
      },
      {
        onSuccess: (votes) => {
          console.log(votes);
          Router.reload();
        },
      }
    );
  };

  if (isLoading || !songChoices) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex">
      {songChoices.map((song, index) => (
        <SongChoice
          key={`song-choice-${index}`}
          onClick={onClick}
          song={song}
        />
      ))}
    </div>
  );
};

export default Index;
