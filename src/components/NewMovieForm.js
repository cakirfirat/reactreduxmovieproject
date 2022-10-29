import React, {Component} from 'react';
import {Button, Form, Image, Message} from 'semantic-ui-react'
import InlineError from "./InlineError";
import PropTypes from "prop-types";
import newMovie from "../reducers/newMovie";
import { Navigate } from "react-router-dom";




class NewMovieForm extends Component {
    
    state = {
        title: this.props.movie ? this.props.movie.Title : '',
        cover: this.props.movie ? this.props.movie.Cover : '',
        error: {},
        redirect: false
    };

    static propTypes = {
        onNewMovieSubmit: PropTypes.func.isRequired
    };

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

        if(Object.keys(error).length === 0) {
            this.props.onNewMovieSubmit(this.state);
            this.setState({title:'',cover:''})
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
            <Form onSubmit={this.onSubmit} loading={this.props.newMovie.fetching ? true : false}>
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