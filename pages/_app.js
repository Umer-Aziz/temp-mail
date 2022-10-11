import Head from "next/head";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar/>
      <Component {...pageProps}/>
      <Footer/>
    </>
  );
}

export default MyApp;
