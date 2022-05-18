import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import GithubIcon from "../components/GithubIconButton";
import { REVALIDATE_TIME_IN_SECONDS } from "../utils/constants";
import { prisma } from "../utils/prisma";

const getLeaderboard = async () => {
  return await prisma.song.findMany({
    orderBy: {
      votes: "desc",
    },
    select: {
      title: true,
      votes: true,
    },
  });
};

function Leaderboard({
  songs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="h-screen w-full flex flex-col text-white">
      <div className="grow overflow-y-auto">
        <h1 className="text-center my-10 text-4xl">Leaderboard</h1>
        <table className="text-left sm:text-center w-full my-4">
          <thead>
            <tr className="text-xl sm:text-2xl">
              <th className="pl-8">Title</th>
              <th className="w-1/4 sm:w-1/2">Votes</th>
            </tr>
          </thead>
          <tbody>
            {songs?.map(({ title, votes }, id) => (
              <tr key={`song-${id}`} className="text-md sm:text-xl">
                <td className="pl-8">{title}</td>
                <td className="w-1/4 sm:w-1/2">{votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex justify-center items-center h-12">
        <Link href="/">
          <span className="hover:text-sky-400 cursor-pointer">Vote</span>
        </Link>
        <GithubIcon />
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const songs = await getLeaderboard();
  return {
    props: { songs },
    revalidate: REVALIDATE_TIME_IN_SECONDS,
  };
};

export default Leaderboard;
