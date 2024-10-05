import React, { useState } from 'react'
import './App.css'

function App() {
    const [query, setQuery] = useState('') // Стейт для хранения запроса юзера
    const [movies, setMovies] = useState([]) // Стейт для хранения списка фильмов

    // Функция для обработки поиска
    const handleSearch = async () => {
        if (query) {
            const response = await fetch(
                `http://www.omdbapi.com/?apikey=c2c5741d&s=${query}`
            )
            const data = await response.json()
            setMovies(data.Search || []) // Обновляем список фильмов
        }
    }

    return (
        <div className='App'>
            <header className='search-bar'>
                <input
                    type='text'
                    placeholder='Search for movies...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Обновляем запрос
                />
                <button onClick={handleSearch}>Search</button>
            </header>

            <section className='movies-list'>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className='movie-card' key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <h3>{movie.Title}</h3>
                            <p>Year: {movie.Year}</p>
                            <button>Add to Favorites</button>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </section>
        </div>
    )
}

export default App
