import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "../styles/globals.css";
import { TRPC_URL } from "../utils/constants";
import { AppRouter } from "./api/trpc/[trpc]";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>I Love Kanye</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url: TRPC_URL,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
