import { useState, useEffect, } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { getTrendingMovies, updateSearchCount } from './appwrite'

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [trendingMovies,setTrendingMovies]=useState([])
  
  //for optimizing the search i.e no API calls on every keystroke
  useDebounce(()=>setDebouncedSearchTerm(searchTerm),1000,[searchTerm])

  const fetchMovies = async (query='') => {
    setIsLoading(true)
    setErrorMessage("") // Reset error message before fetching
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
      if(query && data.results.length>0){
        updateSearchCount(query, data.results[0]) // Update search count for the first movie in the results
      }
    }
    catch (error) {
      console.log("Error fetching movies", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
    finally {
      setIsLoading(false) // Set loading state to false after fetching
    }
  }
  const fetchTrendingMovies=async()=>{
    try{
      const movies=await getTrendingMovies()
      setTrendingMovies(movies)
    }
    catch(error){
      console.log("Error fetching trending movies",error);
      
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm) // if trending movies is called here it would fetch trending movies with each key stroke in input
  }, [debouncedSearchTerm])

  useEffect(()=>{
    fetchTrendingMovies()
  },[])

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
          {
            trendingMovies.length> 0 && (
              <section className='trending'>
                <h2>Trending Movies</h2>
                <ul>
                  {
                    trendingMovies.map((movie,index)=>(
                      <li key={movie.$id}>
                        <p>{index+1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                      </li>
                    ))
                  }
                </ul>
              </section>
            )
          }
          <section className='all-movies'>
            <h2 className>All Movies</h2>
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
                        <MovieCard key={movie.id} movie={movie}/>
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
