import React from "react";
import Body from "/components/body.jsx";
import Image from "next/image";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
const About = () => {
  return (
    <Body title="About">
      <h1 className="font-extrabold text-6xl tracking-tight">About Me</h1>
      <div className="mt-5">
        <h2 className="text-lg">
          Veteran Developer & IT Professional.
        </h2>
      </div>
      <br />

      {/* Military Service Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-blue-600">Military Service</h2>
        <p>
          Having served in the military, I've gained invaluable experience and
          skills that have shaped my character and work ethic. The discipline,
          teamwork, and problem-solving abilities I honed during my service
          continue to influence my approach to various aspects of life and
          work.
        </p>
      </section>

      {/* Education Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-green-600">Education</h2>
        <p>
          I graduated from Colorado Technical University with a Bachelor's
          degree in Information Technology in 2022. Currently, I'm pursuing my
          Master's degree in Information Technology to further expand my
          knowledge and expertise in the IT domain.
        </p>
      </section>

      {/* IT Professional Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-red-600">IT Professional</h2>
        <p>
          Combining my military background with my academic achievements, I've
          embarked on a fulfilling journey in the world of Information
          Technology. With a focus on networking, I've had the opportunity to
          work on diverse projects and collaborate with talented individuals
          across different spaces.
        </p>
      </section>

      {/* Writing on Dev.to Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-yellow-600">Writing on Dev.to</h2>
        <p>
          In addition to my IT career, I enjoy sharing my knowledge and insights
          through writing. You can often find me on{" "}
          <Link
            href="https://dev.to/sudo-self/"
            className="underline decoration-2 decoration-wavy font-bold underline-offset-6"
          >
            Dev.to
          </Link>
          , where I contribute articles on various Java frameworks and tech
          topics. Writing allows me to connect with a wider audience and
          contribute to the vibrant developer community.
        </p>
      </section>

      {/* What You'll Find Here Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-purple-600">
          What You'll Find Here
        </h2>
        <p>
          On this website, you'll discover a blend of my professional
          experiences, tech-related articles, and perhaps even some personal
          reflections. Whether you're here to learn something new, gain insights
          into the tech industry, or simply explore different perspectives, I
          hope you find value in what I have to offer.
        </p>
      </section>

      {/* Stack Section */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-teal-600">Stack</h2>
        <p>
          This entire stack is built with JSX and Next.js using the App Router.
          Several APIs are integrated, including Github, Dev.to, and Youtube.
          The guestbook is authenticated using Google Firebase. The website is
          styled with Tailwind CSS and deployed via Vercel, with DNS managed
          through Cloudflare. Next.js enables the creation of full-stack web
          applications with speed and accuracy.
        </p>
      </section>

      <p className="mt-10 text-lg">
        Thank you for visiting, and I hope you enjoy your time here. Feel free
        to leave a comment in the guestbook!
      </p>
      
     {/* Badge Section */}
      <div className="flex justify-center mt-10">
        <Image
          src="/devbadge1.png"
          alt="Developer Badge 1"
          width={80}
          height={80}
          className="mx-4"
        />
        <Image
          src="/devbadge2.png"
          alt="Developer Badge 2"
          width={80}
          height={80}
          className="mx-4"
        />
        <Image
          src="/devbadge3.png"
          alt="Developer Badge 3"
          width={80}
          height={80}
          className="mx-4"
        />
      </div>
    </Body>
  );
};

export default About;
