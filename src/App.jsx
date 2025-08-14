import { useState, useEffect, } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'

const API_BASE_URL = 'https://api.themoviedb.org/3' //base url 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY //api key stored in .env
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', //type of data we'll get json not xml or html
    Authorization: `Bearer ${API_KEY}` // "Here is my API key so you know I’m allowed to access this"
  }
}

function App() {

  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage("") // Reset error message before fetching
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {// e.g not 200
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);


      if (data.response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies.")
        setMovieList([])
        return
      }
      setMovieList(data.results || [])
    }
    catch (error) {
      console.log("Error fetching movies", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
    finally {
      setIsLoading(false) // Set loading state to false after fetching
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <>
      <main>
        <div className="pattern" >
          <img src="./BG.png" alt="" />
        </div>
        <div className='wrapper'>
          <header>
            <img src="./hero-img.png" alt="Hero" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className='all-movies'>
            <h2 className='mt-[40px]'>All Movies</h2>
            {
              isLoading ? (
                <Spinner/>
              ) : (
                errorMessage ? (
                  <p className='text-red-500'>{errorMessage}</p>
                ) : (
                  <ul>
                    {
                      movieList.map((movie) => (
                        <p className='text-white'>{movie.title}</p>
                      ))}
                  </ul>
                )
              )
            }
          </section>
        </div>
      </main>
    </>
  )
}

export default App
