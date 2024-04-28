// Related third party imports.
import type { AppProps } from "next/app";

// Local application/library specific imports.
import "../styles/globals.css";

// Stateless vars declare.

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
