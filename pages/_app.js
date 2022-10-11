import Head from "next/head";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Umer Aziz" />
        <meta name="description" content="Temporary mail - Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address." />
        <meta name="keywords" content="temp mail, temp-mail,Temporary mail , disposable mail " />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
      </Head>
      <Navbar/>
      <Component {...pageProps}/>
      <Footer/>
    </>
  );
}

export default MyApp;
