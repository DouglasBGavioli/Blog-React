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
} from "@material-ui/core";
function EditComment() {
    const editCommentID = useSelector((state) => state.data);
    const [comments, setComments] = useState({});
    const initialValues = {
        author: "",
        category: "",
    };
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const [body, setBody]= useState("");

    useEffect(() => {
        api.get(`comments/${editCommentID}`).then(({ data }) => {
            setComments(data);
            setBody(data.body);
        });
    }, [editCommentID]);

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setBody(event.target.value);
    };


    function onSubmit(event) {
        event.preventDefault();
        api.put(`comments/${editCommentID}`, {
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
                    EDITAR COMENTARIO
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
                          id="body"
                          name="body"
                          label="Comentario"
                          variant="standard"
                          required
                          fullWidth
                          value={body}
                          onChange={onChange}
                        />
                    <TextField
                        sx={{
                            display: "block",
                            marginBottom: 3,
                        }}
                        disabled
                        fullWidth
                        id="author"
                        name="author"
                        label={comments.author}
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
export default EditComment;
