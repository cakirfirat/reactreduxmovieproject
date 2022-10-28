import React from 'react'
import { Card, Image, Grid, Placeholder, Button, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom";


const extra = movie => {
    return (
        <div>
            <Button fluid animated as={Link} to={`/movie/${movie.Id}`}>
                <Button.Content visible>Edit</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                </Button.Content>
            </Button>
            <br/>
            <Button fluid animated='vertical' color='red'>
                <Button.Content hidden>Delete</Button.Content>
                <Button.Content visible>
                    <Icon name='trash' />
                </Button.Content>
            </Button>
        </div>
    )
};
const MovieCard = ({movie}) => (

    <Grid.Column>
        <Card>

                    <Card
                        image={movie.Cover}
                        header={movie.Title}
                        description="Example"
                        extra={extra(movie)}
                    />



        </Card>
    </Grid.Column>
)

export default MovieCard