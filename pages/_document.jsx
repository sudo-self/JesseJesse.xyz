import { Html, Main, Head, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const headdata = {
    image: "https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/jessejesse.xyz.png",
    url: "https://jessejesse.xyz",
    description: "Creating something useful for the world one line of code at a time",
    title: "Jesse Roper - Developer",
  };

  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="title" content={headdata.title} />
        <meta name="description" content={headdata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={headdata.url} />
        <meta property="og:title" content={headdata.title} />
        <meta property="og:description" content={headdata.description} />
        <meta property="og:image" content={headdata.image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={headdata.url} />
        <meta property="twitter:title" content={headdata.title} />
        <meta property="twitter:description" content={headdata.description} />
        <meta property="twitter:image" content={headdata.image} />
        <meta name="author" content="Jesse Roper" />
        <meta name="theme-color" content="#000" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="https://bucket.jessejesse.xyz/icon512.png"
        />
        
        <meta name="keywords" content="JesseJesse, xyz, sudo-self, sudo, open-source, next-js, ps5" />
      </Head>
      <body className="dark:bg-[#111111] bg-[#f9fafb] dark:text-white duration-75">
        <Main />
        <NextScript />
        <Script src="../components/useDarkMode.jsx" />
      </body>
    </Html>
  );
}

