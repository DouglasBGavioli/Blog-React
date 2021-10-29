import React, { useState} from "react";
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
} from "@material-ui/core";
function Comment() {
    const commentID = useSelector((state) => state.data);
    const initialValues = {
        author: "",
        category: "",
    };
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const {v4: uuid_v4} = require('uuid');

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };
    function onSubmit(event) {
        event.preventDefault();
        api.post(`comments`, {
            id: uuid_v4(),
            timestamp: Date.now(),
            body: values.body,
            author: values.author,
            parentId: commentID,
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
                    NOVO COMENTARIO
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
                        id="body"
                        name="body"
                        label="Comentario"
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
                        label="Autor"
                        type="search"
                        onChange={onChange}
                    />
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
export default Comment;
