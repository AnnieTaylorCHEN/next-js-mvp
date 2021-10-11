import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function Home({ albums }) {
	const [searchText, setSearchText] = useState('');

	let filteredAlbums;

	if (searchText === '') {
		filteredAlbums = albums;
	} else {
		filteredAlbums = albums.filter((album) => album.title.includes(searchText));
	}

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
				<section className="special">
					<img
						src="https://picsum.photos/id/1040/800/500"
						alt="green scale photo"
					/>
					<Link href="/special">
						<h2>Click here for this month's special!</h2>
					</Link>
				</section>
				<section className="filter">
					<label>Type title's name to filter albums by title:</label>
					<input type="text" onChange={(e) => setSearchText(e.target.value)} />
				</section>
				<section className="album-container">
					{filteredAlbums.map(({ userId, id, title }) => (
						<Link href={`/albums/${id}`} key={id}>
							<div className="album-card">
								<FadeIn delay={200}>
									<div className="album-card__info">
										<p>{title}</p>
										<p className="smallprint">Album Id: {id}</p>
										<p className="smallprint">owned by user {userId}</p>
									</div>
								</FadeIn>
							</div>
						</Link>
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

		.special {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
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
	const res = await fetch('https://jsonplaceholder.typicode.com/albums');
	const albums = await res.json();

	return {
		props: {
			albums,
		},
	};
}
