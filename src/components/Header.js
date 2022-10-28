import React, {PureComponent} from 'react';
import {Container, Image, Menu, Visibility} from "semantic-ui-react";
import {fixedMenuStyle, menuStyle} from "../helpers/styleHelper";
import {Link, NavLink, Route, Routes} from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";

class Header extends PureComponent {
    state = {
        menuFixed: false,
        overlayFixed: false,
    }
    stickTopMenu = () => this.setState({ menuFixed: true })


    unStickTopMenu = () => this.setState({ menuFixed: false })
    render() {
        const { menuFixed } = this.state
        return (

            <div>
                <Visibility
                    onBottomPassed={this.stickTopMenu}
                    onBottomVisible={this.unStickTopMenu}
                    once={false}
                >
                    <Menu
                        borderless
                        fixed={menuFixed ? 'top' : undefined}
                        style={menuFixed ? fixedMenuStyle : menuStyle}
                    >
                        <Container text>
                            <Menu.Item>
                                <Link to='/'><Image size='small' src='https://gantry.org/user/pages/02.blog/gantry-logo-competition/grav-logo.png' /></Link>
                            </Menu.Item>
                            <Menu.Item header>
                                <Link as={Link} to='/'>Movie App</Link>
                            </Menu.Item>
                            <Menu.Item as={NavLink} to={"/movies"} exact="true">
                                Movies
                            </Menu.Item>
                            <Menu.Item as={NavLink} to={"/movies/new"}>Add New</Menu.Item>

                        </Container>
                    </Menu>
                </Visibility>



            </div>
        );
    }
}


export default Header;