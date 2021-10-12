import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Album({ photos }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <title>Bear Photo App - Album {id} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Link href="/">
          <h1 className="title">The Bear Photo App</h1>
        </Link>
        <h2> Photo Album {id} </h2>
      </header>
      <main>
        <section className="photo-container">
          {photos.map(({ id, title, url, thumbnailUrl }) => (
            <div key={id}>
              <div className="photo-card">
                <Link href={url} download={title} target="_blank">
                  <img src={thumbnailUrl} alt={`photo-${id}`} />
                </Link>
              </div>

              <FadeIn delay={100}>
                <p>{title}</p>
                <p className="smallprint">photo Id: {id}</p>
              </FadeIn>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <a
          href="https://www.annietaylorchen.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Annie Taylor CHEN
        </a>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .title {
          font-size: 2rem;
          display: block;
          padding: 1rem 0;
		  cursor: pointer;
        }

        .photo-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

		@media (max-width: 800){
			.photo-container {    
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
		}

        .photo-card {
          display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
          width: 280px;
          height: 280px;
          background: seashell;
		  padding: 1rem;
          border-radius: 10px;
        }

        footer {
          position: absolute;
          bottom; 0;
          right: 1rem;
          padding: 1rem;
        }
			`}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 16px;
        }

        * {
          box-sizing: border-box;
        }

        .smallprint {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
  const albums = await res.json();
  let paths = albums.map((a) => ({
    params: { id: a.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`
  );
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
}
