import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
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

function Edit() {
    const [categories, setCategory] = useState([]);
    const [posts, setPosts] = useState([]);
    const initialValues = {
        title: "",
        body: "",
        author: "",
        category: "",
    };
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const [currency] = useState("");
    const editID = useSelector((state) => state.data);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        api.get(`categories`).then(({ data }) => {
            setCategory(data.categories);
        });
        api.get(`posts/${editID}`).then(({ data }) => {
            setPosts(data);
            setBody(data.body);
            setTitle(data.title);
        });
    }, [editID]);
    
    const onChangeBody = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setBody(event.target.value);
    };

    const onChangeTitle = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setTitle(event.target.value);
    };

    function onSubmit(event) {
        event.preventDefault();
        api.put(`posts/${editID}`, {
            title: values.title,
            body: values.body,
        })
            .then(function (response) {
                history.push("/post");
            })
            .catch(function (error) {
                console.log(error);
            });
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
                    EDITAR POST
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
                        label="Titulo"
                        value={title}
                        type="search"
                        onChange={onChangeTitle}
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
                        label="Conteudo"
                        value={body}
                        type="search"
                        onChange={onChangeBody}
                    />
                    <TextField
                        sx={{
                            display: "block",
                            marginBottom: 3,
                        }}
                        fullWidth
                        disabled
                        id="outlined-disabled"
                        label={posts.author}
                    />
                    <TextField
                        disabled
                        children
                        id="category"
                        name="category"
                        select
                        label={posts.category}
                        value={currency}

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
export default Edit;
