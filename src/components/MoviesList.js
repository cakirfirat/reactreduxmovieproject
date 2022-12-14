import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from "./MovieCard";
import {Grid} from "semantic-ui-react";
import MovieCardPlaceholder from "./placeholders/MovieCardPlaceholder";

const MoviesList = ({movies,deleteMovie}) => {
    const emptyMessage = (
        <div className='alert alert-danger'>
            There are no movies yet.
        </div>
    );

    const loading = movies.fetching;
    const moviesList = (
        <div>
            {
                movies.error.response ?
                    <h3>Error retrieving data</h3>
                    :
                    <Grid stackable columns={3}>
                        {
                            loading ? movies.movieList.map(movie=> <MovieCardPlaceholder key={movie.Id}/>) : movies.movieList.map(movie=> <MovieCard key={movie.Id} movie={movie} deleteMovie={deleteMovie} />)
                        }
                    </Grid>
            }
        </div>
    );
    return (
        <div>
            {
                movies.length=== 0 ? emptyMessage : moviesList
            }
        </div>
    );
}



MoviesList.propTypes = {
    movies: PropTypes.shape({
        movieList: PropTypes.array.isRequired
    }).isRequired
};


export default MoviesList;