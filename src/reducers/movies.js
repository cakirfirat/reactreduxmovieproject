import {FETCH_MOVIES_FULFILLED, FETCH_MOVIES_REJECTED, FETCH_MOVIES_PENDING,DELETE_MOVIE_FULFILLED, DELETE_MOVIE_PENDING, DELETE_MOVIE_REJECTED} from "../actions/movies";
const initialState = {
    fetching: false,
    movieList: [],
    error: {}
};
export default (state = initialState , action) => {
    switch (action.type){
        case FETCH_MOVIES_PENDING:
            return {
                ...state,
                fetching: true
            }
        case FETCH_MOVIES_FULFILLED:
            return {
                ...state,
                movieList: action.payload,
                fetching: false
            };
        case FETCH_MOVIES_REJECTED:
            return {
                ...state,
                error: action.payload,
                fetching: false
            };
        case DELETE_MOVIE_PENDING:
            return {
                ...state,
                movie: {
                    fetching: true,
                }
            }
        case DELETE_MOVIE_FULFILLED:
            return {
                ...state,
                movieList: state.movieList.filter(item => item.Id !== action.payload.id),

            };
        case DELETE_MOVIE_REJECTED:
            return {
                ...state,
                movie: {
                    fetching: true
                },
            };
        default:
            return state;
    }
}