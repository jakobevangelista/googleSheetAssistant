import "./global.css";
import ProvidersWrapper from "./ProvidersWrapper";
import ChakraUiWrapper from "./ChakraUiWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraUiWrapper>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </ChakraUiWrapper>
      </body>
    </html>
  );
}
