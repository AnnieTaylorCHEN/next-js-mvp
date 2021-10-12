import Head from "next/head";
import Link from "next/link";

export default function Special({ photos }) {
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
        <title>Bear Photo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <h1 className="title">The Bear Photo App</h1>
        </Link>
      </header>
      <main>
        <h2>This month's special!</h2>
        <section className="album-container">
          {photos.map(({ id, author, width, height, url, download_url }) => (
            <div key={id} className="album-card">
              <div className="album-card__info">
                <a href={download_url} download="picture" target="_blank">
                  <img src={download_url} alt={`pic by ${author} `} />
                </a>
                <p className="smallprint">photo by: {author}</p>
                <p className="smallprint">
                  size:{width} x {height}
                </p>
              </div>
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
          padding: 1rem;
		  cursor: pointer;
        }

        .filter {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        .filter input {
          height: 2rem;
          padding: 0.5rem;
          max-width: 300px;
          margin: 1rem 0;
        }

        .album-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        @media (max-width: 800){
			.album-container {    
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
		}

        .album-card {
          display: block;
          width: 280px;
          height: 280px;
          background: seashell;
          border-radius: 10px;
          position: relative;
        }

        .album-card__info {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          text-align: right;
        }

        .album-card__info img {
            width: 250px;
            height: 180px;
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

export async function getStaticProps() {
  const res = await fetch("https://picsum.photos/v2/list");
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
}
