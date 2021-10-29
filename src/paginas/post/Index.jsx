import React, { useState, useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import api from "../../apis/api";
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    ButtonGroup,
} from "@material-ui/core";
import {
    FaEdit,
    FaTrash,
    FaRegThumbsUp,
    FaRegThumbsDown,
    FaRegCommentDots,
} from "react-icons/fa";

function Post() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const id = useSelector((state) => state.data);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        api.get(`posts`).then(({ data }) => {
            setPosts(data);
        });
        api.get(`/posts/${id}/comments`).then(({ data }) => {
            setComments(data);
        });
        if (refresh) {
            setRefresh(false);
        }
    }, [id, refresh]);

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

    const votationComment = (vote, commentID) => {
        api.post(`comments/${commentID}`, {
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

    const remove= (postID) => {
        api.delete(`posts/${postID}`);
    }
    const removeComment=(commentID) =>{
        api.delete(`comments/${commentID}`);
    }

    const edit=() =>{
        history.push("/editPost");
    }
    const comment=() =>{
        history.push("/comment");
    }

    const editComment=(editCommentID)=>{
        dispatch({ type: "EDIT_COMMENT_ID", editCommentID: editCommentID });
        history.push("/editComment");
    }

    return posts.map((post,index) => {
        const timesTamp = post.timestamp;
        const dateObj = new Date(timesTamp);
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const date = dateObj.getDate();

        return post.id === id ? (
            <div key={post.id}>
                <Card
                    sx={{
                        minWidth: 275,
                        maxWidth: 900,
                        marginLeft: 6.5,
                        marginTop: 4,
                    }}
                    
                >
                    <CardContent>
                        <p className="voteScore">{post.voteScore}</p>
                        <Typography variant="h5" component="div">
                            {post.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Postado por {post.author} em{" "}
                            {`${date}/${month}/${year}`}
                        </Typography>
                        <Typography variant="body2">{post.body}</Typography>
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
                            <Button onClick={(e) => edit()}>
                                <FaEdit />
                            </Button>
                            <Button
                                value="remove"
                                onClick={() => remove(post.id)}
                            >
                                <FaTrash />
                            </Button>
                            <Button value="upVote" >
                                <FaRegThumbsUp />
                            </Button>
                            <Button value="downVote">
                                <FaRegThumbsDown />
                            </Button>
                            <Button onClick={(e) => comment()}>
                                <FaRegCommentDots />
                            </Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
                <Typography
                    sx={{ mb: 1.5, marginLeft: 6.3, marginTop: 5 }}
                    color="text.secondary"
                >
                    COMENTÁRIOS
                </Typography>
                {comments.map((element) => {
                    return (
                        <Card
                            sx={{
                                minWidth: 275,
                                maxWidth: 700,
                                marginLeft: 6.5,
                                marginTop: 4,
                            }}
                            key={element.id}
                        >
                            <CardContent>
                                <p className="voteScore">{element.voteScore}</p>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    Postado por {element.author} em{" "}
                                    {`${date}/${month}/${year}`}
                                </Typography>
                                <Typography variant="body2">
                                    {element.body}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ButtonGroup
                                    fullWidth={true}
                                    variant="text"
                                    aria-label="text button group"
                                    onClick={(event) =>
                                        votationComment(
                                            event.target.value,
                                            element.id
                                        )
                                    }
                                >
                                    <Button onClick={(e) => editComment(element.id)}>
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        value="remove"
                                        onClick={() =>
                                            removeComment(element.id)
                                        }
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Button value="upVote">
                                        <FaRegThumbsUp />
                                    </Button>
                                    <Button value="downVote">
                                        <FaRegThumbsDown />
                                    </Button>
                                </ButtonGroup>
                            </CardActions>
                        </Card>
                    );
                })}
            </div>
        ) : null;
    });
}

export default Post;
