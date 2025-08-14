import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="search-icon" />
                <input
                    type='text'
                    value={searchTerm}
                    placeholder='Search for movies....'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search