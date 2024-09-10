import React, { useState, useEffect } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Body from '../components/body';
import { BsGithub, BsGoogle } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

function GuestBookPage() {
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');
  const [messagenull, setMessagenull] = useState(false);
  const [guestbookData, setGuestbookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setSession(user);
    });

    return () => {
      authUnsubscribe();
    };
  }, []);

  useEffect(() => {
    const messagesRef = firebase.database().ref('guestbook');
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setGuestbookData(data);
      setLoading(false);
    });
    return () => messagesRef.off();
  }, []);

  const getCurrentTime = () => {
    const date = new Date();
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hours + ":" + minutes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setMessagenull(true);
      return;
    }

    const messagesRef = firebase.database().ref('guestbook');
    const newMessage = {
      message: message,
      username: session ? session.displayName : 'Anonymous',
      useremail: session ? session.email : '',
      date: new Date().toISOString().slice(0, 10),
      time: getCurrentTime(),
    };

    try {
      await messagesRef.push(newMessage);
      setMessage('');
      setMessagenull(false);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const messageRef = firebase.database().ref(`guestbook/${id}`);
      await messageRef.remove();
   
      const snapshot = await firebase.database().ref('guestbook').once('value');
      const data = snapshot.val();
      setGuestbookData(data);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Body title="Guestbook">
      <div className="mb-6">
        <h1 className="font-extrabold text-6xl tracking-tight">Guestbook</h1>
        <p className="text-md mt-1">
          Leave a message for me and other visitors here!
        </p>
      </div>
      <div className={`p-3 drop-shadow-md dark:bg-neutral-800 bg-neutral-200 rounded-lg mb-5 ${session ? "hidden" : "block"}`}>
        <p className="text-lg mb-1 font-bold">Sign in</p>
        <div className="flex">
          <button aria-label="Sign in with Github" onClick={() => {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider);
          }} className="bg-[#2f3338] hover:bg-[#4f5257] items-center flex font-bold text-lg text-white dark:text-white px-2 py-2 rounded-lg duration-100">
            <BsGithub />&thinsp;Github
          </button>
          <button aria-label="Sign in with google" onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
          }} className="bg-blue-600 hover:bg-blue-700 items-center flex font-bold text-lg text-white dark:text-white px-2 py-2 rounded-lg duration-100 ml-2">
            <BsGoogle />&thinsp;Google
          </button>
        </div>
      </div>
      <div className={`px-3 pb-2 pt-2 dark:bg-neutral-800 bg-neutral-200 drop-shadow-lg rounded-lg block mb-5 ${session ? "block" : "hidden"}`}>
        <div className="mb-2 block flex-wrap items-center"></div>
        <div className="block">
          <input
            value={message}
            onFocus={() => setMessagenull(false)}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            type="text"
            aria-label="Type your message here"
            className="px-2 w-full text-lg rounded-lg h-10 dark:bg-neutral-900 bg-neutral-100"
          />
          <div className="flex">
            <button aria-label="send your message" onClick={handleSubmit} className="py-1 mt-2 dark:bg-neutral-900 h-10 rounded-lg w-full hover:drop-shadow-md duration-100 bg-neutral-100">
              Send It
            </button>
            <button aria-label="Sign out your account" onClick={() => firebase.auth().signOut()} className="py-1 mt-2 ml-2 dark:bg-neutral-900 h-10 rounded-lg w-[130px] hover:drop-shadow-md duration-100 bg-neutral-100">
              Sign out
            </button>
          </div>
          <p className={`text-red-600 text-md font-bold ${messagenull ? (!message ? "block" : "hidden") : "hidden"}`}>
            Message is empty
          </p>
        </div>
      </div>
      <ul className="">
        {loading ? (
          <Skeleton baseColor="#202020" highlightColor="#444" count={4} height={70} borderRadius={8} className="my-2" />
        ) : (
          Object.keys(guestbookData || {}).map((key) => {
            const guestbook = guestbookData[key];
            return (
              <li key={key} className="hover:bg-neutral-200 hover:dark:bg-neutral-800 hover:drop-shadow-md duration-100 rounded-lg p-3 my-2">
                <p>{guestbook.message}</p>
                <div className="flex flex-wrap dark:text-zinc-500 text-zinc-400 items-center">
                  <p className="text-zinc-600 dark:text-zinc-400">{guestbook.username}</p>
                  <p className="mx-1 text-zinc-300 dark:text-neutral-700">/</p>
                  <div className="flex">
                    <p>{guestbook.date}</p>&thinsp;<p>at</p>&thinsp;
                    <p>{guestbook.time}</p>
                  </div>
                  <div className={`${session && session.email === guestbook.useremail ? "flex" : "hidden"}`}>
                    <p className="mx-1 text-zinc-300 dark:text-neutral-700">/</p>
                    <button aria-label="Delete your message" className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500 duration-100" onClick={() => handleDelete(key)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </Body>
  );
}

export default GuestBookPage;
