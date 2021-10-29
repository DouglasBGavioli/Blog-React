import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import api from "../../apis/api";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    Typography,
    MenuItem,
} from "@material-ui/core";
function NovoPost() {
    const [categories, setCategory] = useState([]);
    const initialValues = {
        title: "",
        body: "",
        author: "",
        category: "",
    };
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const {v4: uuid_v4} = require('uuid');
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        api.get(`categories`).then(({ data }) => {
            setCategory(data.categories);
        });
    }, []);

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const onSelect = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setCurrency(event.target.value);
    };

    function onSubmit(event) {
        event.preventDefault();
        api.post(`posts`, {
            id: uuid_v4(),
            timestamp: Date.now(),
            title: values.title,
            body: values.body,
            author: values.author,
            category: values.category,
        })
            .then(function (response) {
                history.push("/");
            })
            .catch(function (error) {
                console.log(error);
            });
        history.push("/");
    }
    return (
        <form onSubmit={onSubmit}>
            <Card
                sx={{
                    minWidth: 275,
                    maxWidth: 500,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        marginTop: 4,
                        width: 400,
                    }}
                >
                    NOVO POST
                </Typography>
                <CardContent
                    sx={{
                        display: "block",
                        marginLeft: 6.5,
                        marginTop: 4,
                        marginRight: 5,
                    }}
                >
                    <TextField
                        required
                        sx={{
                            display: "block",
                            marginBottom: 3,
                        }}
                        fullWidth
                        id="title"
                        name="title"
                        label="Titulo do post"
                        type="search"
                        onChange={onChange}
                    />
                    <TextField
                        required
                        sx={{
                            display: "block",
                            marginBottom: 3,
                        }}
                        fullWidth
                        id="body"
                        name="body"
                        label="Conteudo do post"
                        type="search"
                        onChange={onChange}
                    />
                    <TextField
                        required
                        sx={{
                            display: "block",
                            marginBottom: 3,
                        }}
                        fullWidth
                        id="author"
                        name="author"
                        label="Autor do post"
                        type="search"
                        onChange={onChange}
                    />
                    <TextField
                        required
                        children
                        id="category"
                        name="category"
                        select
                        label="Categorias"
                        value={currency}
                        onChange={onSelect}
                        helperText="Selecione a categoria"
                        fullWidth
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={index} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </CardContent>
                <CardActions>
                    <Button
                        sx={{
                            position: "absolute",
                            left: "50%",
                            top: "96%",
                            transform: "translate(-50%, -50%)",
                        }}
                        type="submit"
                        size="mediun"
                    >
                        Publicar
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
export default NovoPost;
