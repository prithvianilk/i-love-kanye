import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import GithubIcon from "../components/GithubIconButton";
import SongChoice from "../components/SongChoice";
import Spinner from "../components/Spinner";
import { trpc } from "../utils/trpc";

const Index: NextPage = () => {
  const { isLoading, data: songChoices } = trpc.useQuery(["get-song-choices"], {
    refetchOnMount: false,
  });

  const voteForSongMutation = trpc.useMutation("vote-for-song");

  const [isVoteCompleted, setVoteCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);
  const [numberOfVotes1, numberOfVotes2] = results;
  const [isVoteLoading, setVoteIsLoading] = useState<boolean>(false);

  const onClickSkip = () => {
    Router.reload();
  };

  const resultDisplay = isVoteCompleted ? "block" : "hidden";

  const onClick = (songId: number) => {
    if (!isVoteCompleted && !isVoteLoading) {
      setVoteIsLoading(true);
      voteForSongMutation.mutate(
        {
          id: songId,
          songIds: songChoices?.map(({ id }) => id) as number[],
        },
        {
          onSuccess: (votes) => {
            setVoteIsLoading(false);
            setResults(votes);
            setVoteCompleted(true);
          },
        }
      );
    }
  };

  if (isLoading || !songChoices) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col text-white relative">
      <h1 className="top-4 -translate-y-0 absolute sm:top-1/4 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 w-1/2 z-10 italic text-center text-xl sm:text-3xl">
        Which is the better Kanye song?
      </h1>
      <div className="w-full flex grow relative flex-col sm:flex-row">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 z-10 italic text-md sm:text-3xl">
          {!isVoteLoading ? "or" : <Spinner />}
        </div>
        {songChoices.map((song, index) => (
          <SongChoice
            key={`song-choice-${index}`}
            onClick={onClick}
            song={song}
          />
        ))}
        <h1
          className={`${resultDisplay} flex justify-evenly items-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 text-lg
          sm:top-2/3 sm:left-1/4 sm:w-1/4 sm:text-2xl
          `}
        >
          {numberOfVotes1} Votes
        </h1>
        <button
          type="button"
          className={`${resultDisplay} absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl sm:text-xl text-white bg-scoop hover:bg-scoop-hover focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-md px-4 py-2
          sm:top-2/3 sm:left-1/2  
         `}
          onClick={onClickSkip}
        >
          Next
        </button>
        <span
          className={`${resultDisplay} flex justify-evenly items-center absolute top-5/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 text-lg
          sm:top-2/3 sm:left-3/4 sm:w-1/4 sm:text-2xl
          `}
        >
          {numberOfVotes2} Votes
        </span>
      </div>
      <footer className="flex justify-center items-center h-12">
        <Link href="/leaderboard">
          <span className="hover:text-sky-400 cursor-pointer">Leaderboard</span>
        </Link>
        <GithubIcon />
      </footer>
    </div>
  );
};

export default Index;
