// Related third party imports.
import type { AppProps } from "next/app";

// Local application/library specific imports.
import "../styles/globals.css";
import { FC, ReactNode } from "react";
import { useGetAllBeefNoodleComments } from "../hooks/useBeefNoodleComments";

// Stateless vars declare.

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BeefNoodleCommentProvider>
      <Component {...pageProps} />
    </BeefNoodleCommentProvider>
  );
}

const BeefNoodleCommentProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  useGetAllBeefNoodleComments();
  return <>{children}</>;
};
