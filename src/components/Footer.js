import React from 'react';
import {Container, Divider, Grid, Header, List, Segment} from "semantic-ui-react";


const Footer = (props) => {

    return (
        <Segment inverted style={{ margin: '2em 0em 0em', padding: '2em 0em' }} vertical>
            <Container textAlign='center'>
                <Divider inverted section />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a' href='#'>
                        Site Map
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a' href='#'>
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    )

};

export default Footer;