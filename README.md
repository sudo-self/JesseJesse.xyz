# [JesseJesse.xyz](https://JesseJesse.com)

<img width="1440" alt="Screenshot 2024-09-10 at 2 09 16 PM" src="https://github.com/user-attachments/assets/5177de6d-321f-4b8b-8b64-ac6580380e7f">

## install

`git clone https://github.com/sudo-self/JesseJesse.xyz.git`<br>

`cd JesseJesse.xyz`<br>

`pmpm i`<br>

`pnpm run dev`<br>

<a href="http://localhost:3000">localhost:3000</a><br>

 see `env.example`<br>

 Firebase Guestbook Rules Example<br>
 
```
{
  "rules": {
    ".read": true,  
    ".write": "auth != null"  
  }
}
```
<br>

Github OAuth Firebase Redirect URI<br>
 
```
https://<your_firebase_project>.firebaseapp.com/__/auth/handler

```
pnpm i react-dom-confetti

```
const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  }

```
<br>

Display Current Time JSX

```
 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());
```

incriment page view count +1<br>

```
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
  ```



