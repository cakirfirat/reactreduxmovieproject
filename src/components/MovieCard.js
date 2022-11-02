import React from 'react'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom";


const extra = (movie,deleteMovie) => {
    return (
        <div>
            <Button fluid animated as={Link} to={`/movie/${movie.Id}`}>
                <Button.Content visible>Edit</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                </Button.Content>
            </Button>
            <br/>
            <Button fluid animated='vertical' onClick={()=>deleteMovie(movie.Id)} >
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                    <Icon name='trash' />
                </Button.Content>
            </Button>
        </div>
    )
};
const MovieCard = ({movie,deleteMovie}) => (

    <Grid.Column>
        <Card>

                    <Card
                        image={movie.Cover}
                        header={movie.Title}
                        description="Example"
                        extra={extra(movie,deleteMovie)}
                    />



        </Card>
    </Grid.Column>
)

export default MovieCard