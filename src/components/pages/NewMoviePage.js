import React, {Component} from 'react';
import NewMovieForm from "../NewMovieForm";
import {connect, useSelector} from "react-redux";
import {onNewMovieSubmit} from "../../actions/newMovie";
import {useParams} from "react-router-dom";
import {withRouter} from "../../withRouter";

function NewMoviePage(props) {
    const {Id} = useParams();


    return (
        <div>
            <h2>New Movie</h2>
            <NewMovieForm
                movie={props.movie}
                newMovie={props.newMovie}
                onNewMovieSubmit={props.onNewMovieSubmit}
                Id={Id}
            />

        </div>
    );
}

const mapStateToProps = ({ newMovie, movies }, props) => {
const ids = props.params.Id
    console.log(ids)
    return {
        newMovie,
        movie:movies.movieList.find(item => item.Id === ids)
        //movie: 1//movies.movieList.find(item => item._id === props.match.params._id)
    }

};
const mapDispatchToProps = {
    onNewMovieSubmit
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewMoviePage));