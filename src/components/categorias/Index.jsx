import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../categorias/Style.css";
import api from "../../apis/api";

import {
    CardActions,
    CardContent,
    Button,
    Typography,
    ButtonGroup,
    TextField,
    MenuItem,
} from "@material-ui/core";
import {
    FaEdit,
    FaTrash,
    FaRegThumbsUp,
    FaRegThumbsDown,
    FaRegCommentDots,
} from "react-icons/fa";

function Categorias(props) {
    const [posts, setPosts] = useState([]);
    const category = useSelector((state) => state.data);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currency, setCurrency] = useState("Data");
    const currencies = [
        {
            value: "Numero de likes",
        },
        {
            value: "Data",
        },
    ];
    useEffect(() => {
        api.get(`posts`).then(({ data }) => {
            if (currency === "Numero de likes") {
                setPosts(data.sort((a, b) => b.voteScore - a.voteScore));
            }
            if (currency === "Data") {
                setPosts(data.sort((a, b) => a.timestamp - b.timestamp));
            }
        });
        if (refresh) {
            setRefresh(false);
        }
    }, [refresh, currency]);

    const votation = (vote, postID) => {
        api.post(`posts/${postID}`, {
            option: vote,
        })
            /* .then(function (response) {
                console.log(response);
              })  */
            .catch(function (error) {
                console.log(error);
            });

        setRefresh(true);
    };
    const remove = (postID) => {
        api.delete(`posts/${postID}`);
    };

    const handleClick = (id) => {
        dispatch({ type: "ADD_ID", id: id });
    };

    const edit = (editID) => {
        dispatch({ type: "EDIT_ID", editID: editID });
        history.push("/editPost");
    };
    const comment = (commentID) => {
        dispatch({ type: "COMMENT_ID", commentID: commentID });
        history.push("/comment");
    };
    const onSelect = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div>
            <TextField
                sx={{
                    position: "relative",
                    display: "block",
                    marginTop: 2,
                    marginLeft: 2,
                }}
                id="outlined-select-currency"
                select
                label="Ordenar"
                size="small"
                value={currency}
                onChange={onSelect}
                defaultValue="Selecionar"
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
            {posts.map((post) => {
                const timesTamp = post.timestamp;
                const dateObj = new Date(timesTamp);
                const month = dateObj.getMonth() + 1;
                const year = dateObj.getFullYear();
                const date = dateObj.getDate();

                if (post.category.toLowerCase() === category.toLowerCase())
                    return (
                        <div className="card" key={post.id}>
                            <CardContent
                                sx={{
                                    maxWidth: 400,
                                    maxHeight: 180,
                                    minHeight: 180,
                                }}
                            >
                                <Link
                                    to="Post"
                                    onClick={() => handleClick(post.id)}
                                >
                                    <p className="voteScore">
                                        {post.voteScore}
                                    </p>
                                    <Typography
                                        variant="h5"
                                        color="text.primary"
                                        component="div"
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5 }}
                                        color="text.secondary"
                                    >
                                        Postado por {post.author} em{" "}
                                        {`${date}/${month}/${year}`}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {post.body}
                                    </Typography>
                                </Link>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup
                                    fullWidth={true}
                                    variant="text"
                                    aria-label="text button group"
                                >
                                    <Button onClick={() => edit(post.id)}>
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        value="remove"
                                        onClick={() => remove(post.id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            votation("upVote", post.id)
                                        }
                                    >
                                        <FaRegThumbsUp />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            votation("downVote", post.id)
                                        }
                                    >
                                        <FaRegThumbsDown />
                                    </Button>
                                    <Button onClick={() => comment(post.id)}>
                                        <FaRegCommentDots />
                                    </Button>
                                </ButtonGroup>
                            </CardActions>
                        </div>
                    );
                return category.toLowerCase() === "home" ? (
                    <div className="card" key={post.id}>
                        <CardContent
                            sx={{
                                maxWidth: 400,
                                maxHeight: 180,
                                minHeight: 180,
                            }}
                        >
                            <Link
                                to="Post"
                                onClick={() => handleClick(post.id)}
                            >
                                <p className="voteScore">{post.voteScore}</p>
                                <Typography
                                    variant="h5"
                                    color="text.primary"
                                    component="div"
                                >
                                    {post.title}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    Postado por {post.author} em{" "}
                                    {`${date}/${month}/${year}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {post.body}
                                </Typography>
                            </Link>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup
                                fullWidth={true}
                                variant="text"
                                aria-label="text button group"
                                onClick={(event) =>
                                    votation(event.target.value, post.id)
                                }
                            >
                                <Button onClick={() => edit(post.id)}>
                                    <FaEdit />
                                </Button>
                                <Button
                                    value="remove"
                                    onClick={() => remove(post.id)}
                                >
                                    <FaTrash />
                                </Button>
                                <Button
                                    onClick={() => votation("upVote", post.id)}
                                >
                                    <FaRegThumbsUp />
                                </Button>
                                <Button
                                    onClick={() =>
                                        votation("downVote", post.id)
                                    }
                                >
                                    <FaRegThumbsDown />
                                </Button>
                                <Button onClick={() => comment(post.id)}>
                                    <FaRegCommentDots />
                                </Button>
                            </ButtonGroup>
                        </CardActions>
                    </div>
                ) : null;
            })}
        </div>
    );
}
export default Categorias;
