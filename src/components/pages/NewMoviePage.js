import React, {useEffect} from 'react';
import NewMovieForm from "../NewMovieForm";
import {connect} from "react-redux";
import {onNewMovieSubmit,fetchMovie,onUpdateMovieSubmit} from "../../actions/newMovie";
import {useParams} from "react-router-dom";
import {withRouter} from "../../withRouter";

function NewMoviePage(props) {
    const {Id} = useParams();

    useEffect(() => {
        if(!props.movie) {
            props.fetchMovie(Id)
        }
    }, []);


    return (
        <div>
            <h2>New Movie</h2>
            <NewMovieForm
                movie={props.movie}
                newMovie={props.newMovie}
                onNewMovieSubmit={props.onNewMovieSubmit}
                onUpdateMovieSubmit={props.onUpdateMovieSubmit}
                Id={Id}
            />

        </div>
    );
}

const mapStateToProps = ({ newMovie, movies }, props) => {
    return {
        newMovie,
        movie: movies.movieList.find(item => item.Id == props.params.Id)
        //movie: 1//movies.movieList.find(item => item._id === props.match.params._id)
    }

};
const mapDispatchToProps = {
    onNewMovieSubmit,
    onUpdateMovieSubmit,
    fetchMovie
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMoviePage));