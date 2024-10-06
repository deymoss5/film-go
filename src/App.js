import React, { useState } from 'react'
import './App.css'

function App() {
    const [query, setQuery] = useState('') // Стейт для хранения запроса юзера
    const [movies, setMovies] = useState([]) // Стейт для хранения списка фильмов
    const [favorites, setFavorites] = useState(() => {
        // Попробуем загрузить избранное из localStorage при инициализации
        const savedFavorites = localStorage.getItem('favorites')
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

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

    // Добавление в избранное
    const addToFavorites = (movie) => {
        const newFavorites = [...favorites, movie]
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites)) // Сохраняем в localStorage
    }

    // Удаление из избранного
    const removeFromFavorites = (movieId) => {
        const newFavorites = favorites.filter(
            (movie) => movie.imdbID !== movieId
        )
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites)) // Обновляем в localStorage
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
            {/* Рендерим карточки фильмов */}
            <section className='movies-list'>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className='movie-card' key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <h3>{movie.Title}</h3>
                            <p>Year: {movie.Year}</p>
                            <button onClick={() => addToFavorites(movie)}>
                                Add to Favorites
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </section>

            {/* Рендерим список избранного */}
            <section className='favorite-list'>
                <h2>Favorites</h2>
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div className='favorite-movie' key={movie.imdbID}>
                            <h3>{movie.Title}</h3>
                            <button
                                onClick={() =>
                                    removeFromFavorites(movie.imdbID)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No favorite movies yet.</p>
                )}
            </section>
        </div>
    )
}

export default App
