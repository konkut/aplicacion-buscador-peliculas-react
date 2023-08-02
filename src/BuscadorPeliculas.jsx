import React, { useState } from 'react'

const BuscadorPeliculas = () => {
    const [buscador, setBuscador] = useState('')
    const [pelicula, setPelicula] = useState([])

    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = 'f521d18b96d9185c310cd6e725288fdb';

    const onChange =(e)=>{
        const data = e.target.value.trimStart();
        setBuscador(data);
    }  
    const onSubmit =(e)=>{
        e.preventDefault();
        if(!buscador) return
        fetchPeliculas();
    }  
    
    const fetchPeliculas = async()=>{
        try {
            
            const response = await fetch(`${urlBase}?query=${buscador}&api_key=${API_KEY}`);
            const data = await response.json();
            setPelicula(data.results);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className='container'>
            <h1 className='title'>Buscador de peliculas</h1>
            <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder='Ingrese una pelicula' value={buscador} onChange={onChange} />
                <button type='submit' className='search-button'>Buscar</button>
            </form>
            <div className='movie-list'>
                {
                    pelicula.map(row => (
                        row.poster_path ? 
                        <div key={row.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${row.poster_path}`}></img>
                            <p>{row.original_title}</p>
                            <p>{row.overview}</p>
                        </div>
                        :''
                    ))
                }
            </div>
        </div>
    )
}

export default BuscadorPeliculas
