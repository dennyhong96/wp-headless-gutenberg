import useMobileViewport from "@/hooks/useMobileViewport";
import "@/styles/main.scss";

function MyApp({ Component, pageProps, data: initialData }) {
  useMobileViewport();

  return <Component {...pageProps} />;
}

export default MyApp;
