import React from "react";
import Cabecalho from "./components/cabecalho/Index";
import Home from "./paginas/home/Index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./store/Index";
import NovoPost from "./paginas/novoPost/Index"
import Post from "./paginas/post/Index";
import EditPost from "./paginas/editPost/Index";
import Comment from "./paginas/comment/Index";
import EditComment from "./paginas/editComment/Index";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Cabecalho />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/newPost">
                            <NovoPost/>
                        </Route>
                        <Route path="/Post">
                            <Post/>
                        </Route>
                        <Route path="/editPost">
                            <EditPost/>
                        </Route>
                        <Route path="/comment">
                            <Comment/>
                        </Route>
                        <Route path="/editComment">
                            <EditComment/>
                        </Route>
                    </Switch>
            </Router>
        </Provider>
    );
}

export default App;
