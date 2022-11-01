import React, {Component} from 'react';
import {Button, Form, Image, Message} from 'semantic-ui-react'
import InlineError from "./InlineError";
import PropTypes from "prop-types";
import newMovie from "../reducers/newMovie";
import { Navigate } from "react-router-dom";




class NewMovieForm extends Component {
    
    state = {
        id: this.props.movie ? this.props.movie.Id : '',
        title: this.props.movie ? this.props.movie.Title : '',
        cover: this.props.movie ? this.props.movie.Cover : '',
        error: {},
        redirect: false
    };

    static propTypes = {
        onNewMovieSubmit: PropTypes.func.isRequired
    };

    UNSAFE_componentWillReceiveProps(nextProps) {

        if(nextProps.newMovie.movie[0]){
            const movie = nextProps.newMovie.movie[0];
            this.setState({
                id: movie.Id,
                title: movie.Title,
                cover: movie.Cover
            })
        }

    }

    handleChange= (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = () => {
        const error = this.validate();
        this.setState({
            error,
            redirect: true
        });


        const Id = this.state?.id || this.props.newMovie.movie[0]?.Id;

        if(Object.keys(error).length === 0) {


            if(!Id){
                this.setState({title:'',cover:'',id:''})
                this.props.onNewMovieSubmit(this.state);



            }else{
                this.props.onUpdateMovieSubmit({...this.state,Id});

            }
        }
    };
    validate = () => {
        const error = {};
        if(!this.state.title) error.title = "Can't be blank."
        if(!this.state.cover) error.cover = "Can't be blank."
        return error;
    };

    render(){
        const {error} = this.state;
        const form = (
            <Form onSubmit={this.onSubmit} loading={this.props.newMovie.fetching || this.props.newMovie.movie.fetching ? true : false}>
                <Form.Field error={error.title ? true : false}>
                    <label>Movie Title</label>
                    {error.title && <InlineError message={error.title}/>}
                    <input
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='Movie Title' />
                </Form.Field>
                <Form.Field error={error.cover ? true : false}>
                    <label>Movie Cover</label>
                    {error.cover && <InlineError message={error.cover}/>}
                    <input
                        id="cover"
                        name="cover"
                        value={this.state.cover}
                        onChange={this.handleChange}
                        placeholder='Movie Cover URL' />
                </Form.Field>
                <Image src={this.state.cover} size="small"/>
                <div className="clearfix"></div>
                <Button type='submit'>Submit</Button>
                {
                    this.props.newMovie.error.config &&
                    (
                        <Message negative>
                            <Message.Header>Üzgünüz...</Message.Header>
                            <p>Bir seyler ters gitti</p>
                        </Message>
                    )
                }
            </Form>

        );
        return (
            <div>
                {
                    this.props.newMovie.done && this.state.redirect ?  <Navigate to="/movies" /> : form
                }
            </div>
        );
    }
}


export default NewMovieForm;