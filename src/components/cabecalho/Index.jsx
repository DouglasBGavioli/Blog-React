import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../apis/api";
import "../cabecalho/Style.css";
import "../../css/Reset.css";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from "@material-ui/core";
import { Box } from "@material-ui/system";
import { FaHome } from "react-icons/fa";

function Cabecalho() {
    const [categorias, setCategorias] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
  

    useEffect(() => {
        api.get(`categories`).then(({ data }) => {
            setCategorias(data.categories);
        });
    }, []);

    const handleClick = (categoria) => {
        dispatch({ type: "ADD_CATEGORY", name: categoria });
        history.push("/");
    };
    const handleClickHome = (categoria) => {
        dispatch({ type: "ADD_CATEGORY", name: "home" });
        history.push("/");
    };

    const novoPost = () => {
        history.push("/newPost");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link
                        className="menu__logo"
                        to="/"
                        onClick={() => handleClickHome()}
                    >
                        BLOG
                    </Link>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Button
                            color="inherit"
                            onClick={() => handleClickHome()}
                        >
                            <FaHome />
                            HOME
                        </Button>
                        {categorias.map((categoria, index) => {
                            return (
                                <Button
                                    color="inherit"
                                    key={index}
                                    onClick={() => handleClick(categoria.name)}
                                >
                                    {categoria.name}
                                </Button>
                            );
                        })}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            novoPost();
                        }}
                    >
                        NOVO POST
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Cabecalho;
