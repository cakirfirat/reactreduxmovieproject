import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React, {Component} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from "semantic-ui-react";
import {Route, Routes} from "react-router-dom";
import MoviesPage from "./components/pages/MoviesPage";
import NewMoviePage from "./components/pages/NewMoviePage";

class App extends Component {

  render() {
    return (
        <div className="App">
            <Header></Header>
            <Container>

                <Routes>
                    <Route exact path='/movies' element={<MoviesPage />}></Route>
                    <Route exact path='/movies/new' element={<NewMoviePage />}></Route>
                    <Route exact path='/movie/:Id' element={<NewMoviePage />}></Route>
                </Routes>

            </Container>
            <Footer></Footer>
        </div>
    )
  }
}

export default App;
