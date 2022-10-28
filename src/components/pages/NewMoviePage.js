import React, {Component} from 'react';
import NewMovieForm from "../NewMovieForm";
import {connect} from "react-redux";
import {onNewMovieSubmit} from "../../actions/newMovie";
import {useParams} from "react-router-dom";

class NewMoviePage extends Component {
constructor(props) {
    super(props);
    this.state = {}
}


    render() {
        return (
            <div>
                <h2>New Movie</h2>
                {console.log(this.props)}
            <NewMovieForm
                movie={this.props.movie}
                newMovie={this.props.newMovie}
                onNewMovieSubmit={this.props.onNewMovieSubmit}/>

            </div>
        );
    }
}



const mapStateToProps = ({ newMovie, movies },props) => {
    console.log(props)
    return {
        newMovie,
        movie: 1
            //console.log(movies.movieList.find(item => item.Id ===))
            //movies.movieList.find(item => item.Id === props.match.params.Id)

    }
};
const mapDispatchToProps = {
    onNewMovieSubmit
};


export default connect(mapStateToProps, mapDispatchToProps)(NewMoviePage);