import type { NextPage } from "next";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import GithubIcon from "../components/GithubIcon";
import SongChoice from "../components/SongChoice";
import { DAY_IN_MS } from "../utils/constants";
import { trpc } from "../utils/trpc";

const Index: NextPage = () => {
  const { isLoading, data: songChoices } = trpc.useQuery(["get-song-choices"], {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: DAY_IN_MS,
  });

  const voteForSongMutation = trpc.useMutation("vote-for-song");

  const [isVoteCompleted, setVoteCompleted] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  const onClickSkip = () => {
    Router.reload();
  };

  const resultDisplay =  isVoteCompleted ? "block" : "hidden";

  const onClick = (songId: number) => {
    if (!isVoteCompleted) {
      voteForSongMutation.mutate(
        {
          id: songId,
          songIds: songChoices?.map(({ id }) => id) as number[],
        },
        {
          onSuccess: (votes) => {
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
        <svg
          role="status"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col text-white relative">
      <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 z-10 italic text-center text-xl sm:text-3xl">
        Which is the better Kanye song?
      </h1>
      <div
        className={`${resultDisplay} flex justify-evenly items-center absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 text-2xl`}
      >
        <p>
          {results[0]} Votes
        </p>
        <button
          type="button"
          className="ml-3 text-center text-xl sm:text-xl text-white bg-scoop hover:bg-scoop-hover focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-md px-4 py-2 mr-2"
          onClick={onClickSkip}
        >
          Next
        </button>
        <p>
          {results[1]} Votes
        </p>
      </div>
      <div className="flex grow relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 z-10 italic text-md sm:text-3xl">
          or
        </div>
        {songChoices.map((song, index) => (
          <SongChoice
            key={`song-choice-${index}`}
            onClick={onClick}
            song={song}
          />
        ))}
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
