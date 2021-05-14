import React, {useState} from 'react';

import MoviesList from './components/MoviesList';

function App() {
    const dummyMovies = [
        {
            id: 1,
            title: 'Some Dummy Movie',
            openingText: 'This is the opening text of the movie',
            releaseDate: '2021-05-18',
        },
        {
            id: 2,
            title: 'Some Dummy Movie 2',
            openingText: 'This is the second opening text of the movie',
            releaseDate: '2021-05-19',
        },
    ];

    const [movies,setMovies] = useState([]);

    async function fetchMoviesHandler(){
        await fetch('https://swapi.dev/api/films/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const tranformedMovies = data.results.map(movieData => {
                    return {
                        id:movieData.episode_id,
                        title:movieData.title,
                        openingText:movieData.opening_crawl,
                        releaseDate:movieData.release_date,
                    }
                });
                setMovies(tranformedMovies);
            });
    }

    return (
        <React.Fragment>
            <div className="uk-section uk-background-muted">
                <div className="uk-container uk-container-xsmall">
                    <section>
                        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
                    </section>
                    <section>
                        <MoviesList movies={movies}/>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
