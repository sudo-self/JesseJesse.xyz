import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Body from "../components/body.jsx";
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";
import { SiYoutubemusic } from "react-icons/si";
import Link from "next/link";
import YouTube from "react-youtube";
import { CgClose } from "react-icons/cg";
import { MdPlaylistPlay } from "react-icons/md";

const tokenkey = "AIzaSyCaRXoR-xQJsTV8-xQAeMPh97FJ74Gpssg";

const Music = () => {
  const [loading, setLoading] = useState(true);
  const [playList, setPlaylist] = useState([]);
  const [playListo, setPlaylisto] = useState(0); // Initialize with 0
  const [playerload, setPlayerLoad] = useState(true);
  const [playeritems, setPlayerItems] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [currentSeconds, setCurrentSeconds] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  let videoElement = null;

  function scrollToTop() {
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=RDCLAK5uy_kHSavu4ofFfVIOzsA_wa4SuMS3dc76TYQ&key=${tokenkey}&maxResults=1000`,
      {}
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Playlist data:", data);
        setPlaylist(data.items || []);
        setPlaylisto(data.pageInfo?.totalResults || 0);
        setLoading(false);
       
        const shuffledPlaylist = shuffle(data.items).slice(0, 5);
        console.log("Shuffled Playlist:", shuffledPlaylist);
      
        musicPlayerSetup(shuffledPlaylist[0]);
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
        setLoading(false);
      });
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const LoadDisplay = (
    <div>
      <Skeleton
        className="my-2"
        count={5}
        borderRadius="10px"
        height="80px"
        baseColor="#202020"
        highlightColor="#666"
      />
    </div>
  );

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (videoStatus === 3) {
      setPlayerLoad(true);
    }
    if (videoStatus !== 3) {
      setPlayerLoad(false);
    }
  }, [videoStatus]);

  const _onReady = (event) => {
    videoElement = event.target;
    setIsPaused(false);
    setTime(0);
    videoElement.unMute();
    videoElement.setVolume(100);
    setVideoDuration(videoElement.getDuration());
    videoElement.playVideo();
  };

  const musicPlayerSetup = (items) => {
    setPlayerItems(items);
    scrollToTop();
  };

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m >= 0 ? (m < 10 ? "0" + m + ":" : m + ":") : "0:";
    var sDisplay = s >= 0 ? (s < 10 ? "0" + s : +s) : "";
    return hDisplay + mDisplay + sDisplay;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoElement) {
        let videoseconds = Math.floor(videoElement.getCurrentTime());
        setTime(secondsToHms(videoseconds));
        setCurrentSeconds(videoseconds);
        setVideoStatus(videoElement.getPlayerState());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

    const controlIcon = () => {
      if (videoElement && isPaused) {
        return (
          <p onClick={() => videoElement.playVideo()}>
            <BsPlayFill />
          </p>
        );
      } else {
        return (
          <p onClick={() => videoElement && videoElement.pauseVideo()}>
            <BsPauseFill />
          </p>
        );
      }
    };



  const detectKeyDown = (e) => {
    if (e.key === " " && videoStatus === 1) {
      scrollToTop();
      videoElement.pauseVideo();
    } else if (e.key === " " && videoStatus === 2) {
      scrollToTop();
      videoElement.playVideo();
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", detectKeyDown, true);
    return () => {
      document.removeEventListener("keypress", detectKeyDown, true);
    };
  }, []);

  return (
    <Body title="Music">
      <div>
        <h1 className="text-6xl font-extrabold tracking-tight">Music</h1>
        <p className="mt-1 text-lg">Youtube Data Api v3</p>
      </div>

      <div
        className={`relative mt-5 block h-auto w-full items-center overflow-hidden rounded-lg bg-purple-50 shadow-xl transition-all duration-100 dark:bg-neutral-800 music:block music:h-[220px]  ${
          !playeritems ? "!hidden " : "block"
        } px-[10px] py-[10px]`}
        id="player"
      >
        <div className="flex music:h-0">
          <div className="flex-1"></div>
          <div className="g-red-500 mr-2 h-5 w-5 items-center rounded-full music:block">
            <button
              aria-label="close musicplayer"
              onClick={() => setPlayerItems(null)}
              className="ml-auto rounded-full bg-slate-300 p-1 text-xl duration-100 hover:bg-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 music:flex music:overflow-visible"
            >
              <CgClose />
            </button>
          </div>
        </div>
        <div className="block items-center music:flex">
          {playeritems && (
            <YouTube
              videoId={playeritems.snippet.resourceId.videoId}
              opts={opts}
              onReady={_onReady}
              onStateChange={() => {
                console.log("hello");
              }}
              onEnd={() => {
                musicPlayerSetup(
                  playList[
                    playeritems.snippet.position === playListo - 1
                      ? 0
                      : playeritems.snippet.position + 1
                  ]
                );
                setPlayerLoad(true);
              }}
            />
          )}
          {playeritems && playeritems.snippet && playeritems.snippet.thumbnails && playeritems.snippet.thumbnails.standard && (
            <img
              className="dragnone musicalbumimg mt-[-34px] !h-[268px] !w-auto"
              src={playeritems.snippet.thumbnails.standard.url}
              alt=""
            />
          )}

          <div className="block">
            {playeritems && (
              <div className="py-auto mt-2 block shrink-0 items-center text-center music:ml-[50px] music:mt-0 music:text-left">
                <div className="flex">
                  <div className="mx-auto flex max-w-[525px] items-center music:mx-0">
                    <div className="block">
                      <h1 className="notranslate text-2xl font-bold">
                        {playeritems.snippet.title.split(/[[:(]/)[0]}
                      </h1>
                      <Link
                        target="_blank"
                        href={
                          "https://music.youtube.com/channel/" +
                          playeritems.snippet.videoOwnerChannelId
                        }
                        className="duration-75 hover:opacity-70"
                      >
                        <p>
                          {playeritems.snippet.videoOwnerChannelTitle.replace(
                            / - Topic/g,
                            " "
                          )}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-4 items-center music:ml-[-10px] music:mt-2">
                  <button
                    onClick={() => {
                      scrollToTop();
                      setPlayerItems(
                        playList[
                          playeritems.snippet.position === 0
                            ? playListo - 1
                            : playeritems.snippet.position - 1
                        ]
                      );
                    }}
                    className="rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <BsFillSkipStartFill />
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="mx-[50px] items-center rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700 music:mx-[30px]"
                  >
                    {playerload ? (
                      <div className="spinner-container">
                        <div className="loading-spinner !h-[37px] w-[37px]"></div>
                      </div>
                    ) : (
                      controlIcon()
                    )}
                  </button>
                  <button
                    onClick={() => {
                      scrollToTop();
                      setPlayerItems(
                        playList[
                          playeritems.snippet.position === playListo - 1
                            ? 0
                            : playeritems.snippet.position + 1
                        ]
                      );
                    }}
                    className="rounded-lg p-1 text-4xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <BsSkipEndFill />
                  </button>
                </div>
                {
                  <div className="mx-4 mt-2 block items-center music:mx-0 music:mt-0">
                    <input
                      value={currentSeconds}
                      min="0"
                      max={videoDuration}
                      onChange={(x) => {
                        setTime(x.target.value);
                        videoElement.seekTo(x.target.value);
                      }}
                      step="1"
                      type="range"
                      className="musicplayerrange ml-0 w-[290px] xss:w-[300px] music:ml-[-5px] music:w-[550px]"
                    />
                    <p className="!flex text-[0.5px] music:!hidden">
                      <br />
                    </p>
                    <div className="mt-[-5px]">
                      <p className="mr-3 !inline-flex text-center music:!hidden">
                        <p>{time}</p>&thinsp;/&thinsp;
                        <p>
                          {(Math.floor(videoDuration / 60) < 10
                            ? "0" + Math.floor(videoDuration / 60)
                            : Math.floor(videoDuration / 60)) +
                            ":" +
                            (Math.floor(videoDuration % 60) < 10
                              ? "0" + Math.floor(videoDuration % 60)
                              : Math.floor(videoDuration % 60))}
                        </p>
                      </p>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex ">
        <button
          aria-label="Play all songs"
          onClick={() => {
            musicPlayerSetup(
              playList[Math.floor(Math.random() * playListo)]
            );
          }}
          className="mt-2 flex items-center rounded-xl bg-[#ce9dff] p-3 text-left text-xl font-bold duration-100 hover:bg-[#c081ff] dark:bg-[#9900ff] dark:hover:bg-[#9900ffb2]"
        >
          <p className="text-3xl">
            <BsPlayFill />
          </p>
        </button>
        <button>
          <Link
            aria-label="View playlist on youtubemusic"
            href="https://music.youtube.com/watch?v=60ItHLz5WEA&list=RDCLAK5uy_kHSavu4ofFfVIOzsA_wa4SuMS3dc76TYQ"
            className="mt-2 flex dark:bg-zinc-700 items-center rounded-xl bg-zinc-200 px-3 py-[5px] text-left font-bold duration-100 hover:bg-zinc-300  dark:hover:bg-zinc-600 ml-3"
            target="_blank"
          >
            <p className="text-3xl">
              <MdPlaylistPlay />
            </p>
            <div className="ml-1 block">
              <p className="text-lg">View playlist</p>
              <p className="ml-[2px] text-xs">YoutubeMusic</p>
            </div>
          </Link>
        </button>
      </div>

      <ul>
        {playList.map((item, index) => (
          <li key={item.id} className={`text-${(index + 1) * 100} hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md`}>
            <a href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`} target="_blank" rel="noopener noreferrer">
              {item.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </Body>
  );
};

export default Music;
