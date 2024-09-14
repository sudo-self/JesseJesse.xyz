import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import PinnedRepos from "./PinnedRepos";
import RecentlyBlog from "./RecentlyBlog";
import Head from "next/head";
import Confetti from "react-dom-confetti";


const firebaseConfig = {
  apiKey: "AIzaSyAFRwmutdSXr2XlY_VROUkN0QRna8kbDvc",
  authDomain: "fresh-squeezed-lemons.firebaseapp.com",
  databaseURL: "https://fresh-squeezed-lemons-default-rtdb.firebaseio.com",
  projectId: "fresh-squeezed-lemons",
  storageBucket: "fresh-squeezed-lemons.appspot.com",
  messagingSenderId: "680668621920",
  appId: "1:680668621920:web:df718ab12a9a62eda4e705",
  measurementId: "G-BWS491WFX8"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const confettiConfig = {
  angle: 180,
  spread: 360,
  startVelocity: 500,
  elementCount: 1200,
  dragFriction: 0.3,
  duration: 4000,
  stagger: 0,
  width: "20px",
  height: "20px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export default function HomePage() {
  const [viewCount, setViewCount] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const fetchAndIncrementViewCount = async () => {
      try {
        const snapshot = await firebase.database().ref("viewCount").once("value");
        const count = snapshot.val();
        setViewCount(count);

      
        await incrementViewCount();

    
        const intervalId = setInterval(() => {
          setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(intervalId); 
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchAndIncrementViewCount();
  }, []);

  const incrementViewCount = async () => {
    try {
      const countRef = firebase.database().ref("viewCount");
      await countRef.transaction((currentCount) => {
        return (currentCount || 0) + 1;
      });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const triggerConfetti = async () => {
    await incrementViewCount(); 
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  };
  

return (
    <main>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="title" content="XYZ" />
        <meta name="description" content="Explore Jesse Roper's personal site featuring blogs, projects, and creative works powered by Next.js." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://JesseJesse.xyz" />
        <meta property="og:title" content="XYZ" />
        <meta property="og:description" content="Explore Jesse Roper's personal site featuring blogs, projects, and creative works powered by Next.js." />
        <meta property="og:image" content="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/jessejesse.xyz.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://JesseJesse.xyz" />
        <meta property="twitter:title" content="XYZ" />
        <meta property="twitter:description" content="Explore Jesse Roper's personal site featuring blogs, projects, and creative works powered by Next.js." />
        <meta property="twitter:image" content="https://pub-62f7f17b63fe4f5cbbf739cf66c0c5ee.r2.dev/jessejesse.xyz.png" />
        <meta name="author" content="Jesse Roper" />
        <title>JesseJesse.xyz</title>
        <script src="https://firebasestorage.googleapis.com/v0/b/jessejessexyz.appspot.com/o/corner-button-1726296101906.js?alt=media&token=7b7b3257-6a2f-4dfa-83dd-9e3c42382755"></script>
      </Head>
      <Confetti active={confettiActive} config={confettiConfig} />
      <div className="xs:ml-0 ml-2">
        <div className="flex flex-col-reverse sm:flex-row items-start my-5 ">
          <div className="flex flex-col pr-8">
            <div className="flex items-center">
              <h1 className="font-extrabold mt-6 text-3xl md:text-4xl tracking-tight notranslate">
                Jesse Roper&nbsp;
                <a
                  href="https://floater.jessejesse.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  (⌐■_■)🔘
                </a>
              </h1>
            </div>
            <div className="flex items-center ml-6">
              <button onClick={triggerConfetti} className="hover:text-green-500 flex items-center">
                {viewCount !== null ? viewCount : "Loading..."}
                <img
                  src="https://api.iconify.design/game-icons:protection-glasses.svg?color=%23ffffff"
                  alt="Icon"
                  style={{ marginLeft: '5px' }}
                />
              </button>  
            </div>
            <p className="text-blue-600 dark:text-blue-400 mb-3 ml-6 flex items-center">
              {currentTime}{" "}
              <img
                src="https://api.iconify.design/typcn:watch.svg?color=%23ffffff"
                alt="Icon"
                style={{ marginLeft: '5px' }}
              />
            </p>
              <a
          href="https://github.com/sudo-self/floater-xyz/actions/workflows/nextjs.yml"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://github.com/sudo-self/floater-xyz/actions/workflows/nextjs.yml/badge.svg"
            alt="Deploy Next.js site to Pages"
            className="w-32"
          />
        </a>
          </div>
          <div className="flex-1"></div>
          <div className="w-[130px] sm:w-[140px] relative sm:my-[25px] my-[-15px] sm:mx-0 mx-[-10px] ">
            <Image
              placeholder="blur"
              src={require("/public/JesseRoper.jpg")}
              alt="Jesse Roper"
              className="w-auto rounded-full grayscale"
            />
          </div>
        </div>
      </div>
      <div className="mt-[40px] mb-[20px]">
        <h1 className="tracking-tighter  text-4xl mb-6 font-extrabold">Blogs</h1>
        <RecentlyBlog />
      </div>
      <div className="mt-[70px]">
        <h1 className="tracking-tighter  text-4xl mb-6 font-extrabold">Some Projects</h1>
        <PinnedRepos />
      </div>
    </main>
  );
}
















