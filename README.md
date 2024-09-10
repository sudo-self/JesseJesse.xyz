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

