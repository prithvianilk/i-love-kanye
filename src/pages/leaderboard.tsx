import { Song } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import Script from "next/script";
import GithubIcon from "../components/GithubIcon";
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

interface LeaderboardProps {
  songs: Song[];
}

const Leaderboard: NextPage<LeaderboardProps> = ({ songs }) => {
  return (
    <div className="h-screen w-full flex flex-col text-white">
      <div className="grow">
        <h1 className="text-center my-10 text-4xl">Leaderboard</h1>
        <table className="w-full text-center mt-4 table-fixed">
          <thead>
            <tr className="text-2xl">
              <th>Title</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {songs?.map(({ title, votes }, id) => (
              <tr key={`song-${id}`} className="text-xl">
                <td>{title}</td>
                <td>{votes}</td>
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
      <Script async defer src="https://buttons.github.io/buttons.js" />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const songs = await getLeaderboard();
  return {
    props: { songs },
  };
}

export default Leaderboard;
