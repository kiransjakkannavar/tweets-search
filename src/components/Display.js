import React, { Component } from 'react'
import { Container, Paper, Grid, Button, Typography, Avatar, TextField, Card, CardMedia, CardActions, CardContent, CardHeader } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { withStyles } from '@material-ui/core/styles';
import ContentLoader, { Facebook } from 'react-content-loader'
import axios from 'axios'
import moment from 'moment'



const Loader = () => <Facebook />

const styles = (theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#00ADE2'//theme.palette.secondary.main,
    },
    button: {
        backgroundColor: '#00ADE2',
        margin: theme.spacing(1, 1, 3),
    },
    image: {
        backgroundColor: 'red[500]',
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },



})

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Display extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: this.props ? this.props.location.state.query : "",
            tweets: []
        }
    }


    fetchTweets = async () => {
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=${this.state.text}&count=9`, { headers: { 'Authorization': `bearer AAAAAAAAAAAAAAAAAAAAAHHGGAEAAAAAbYHzOS58WYF%2Fu%2Fxg%2Bpg1knVIAeU%3DDxrYK0bafPLTD3w4DyIFwbv9HX3xRQ1TRmenZF8C59P8ggGit3` } })

            console.log(response.data, 'axios call')
            if (response.data.statuses.length !== 0) {
                this.setState({ tweets: response.data.statuses })
            } else {
                this.props.history.push("/")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    componentDidMount() {
        this.fetchTweets()
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { text } = this.state
        if (text.length == 0) {
            alert("Please type a keyword to search")
        } else {
            this.fetchTweets()
        }
    }

    render() {
        const { classes } = this.props
        const { tweets } = this.state
        console.log(this.props.location.state.query)
        return (
            <Container maxWidth="lg">
                <div className={classes.root}>

                    <Grid container spacing={1}>
                        <Grid item xs={1}>
                            <Typography component="h1" variant="h5">
                                Tweets
            </Typography>

                        </Grid>
                        <Grid item xs={1}>
                            <Avatar className={classes.avatar}>
                                <TwitterIcon />
                            </Avatar>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography component="h1" variant="h5">
                                Search
            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="search"
                                label="Search"
                                name="search"
                                value={this.state.text}
                                onChange={(event) => this.setState({ text: event.target.value })}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" type="submit" className={classes.button} onClick={this.onSubmit}>
                                SEARCH
                            </Button>
                        </Grid>

                    </Grid>
                </div>

                <Container className={classes.cardGrid} maxWidth="md">
                    {tweets.length == 0 ? <Loader /> :
                        <Grid container spacing={4}>
                            {tweets.map((tweet, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="user" src={tweet.user.profile_image_url} className={classes.avatar}>
                                                    T
          </Avatar>
                                            }
                                            title={tweet.user.screen_name}
                                            subheader={moment(tweet.created_at).format("dddd, MMMM Do YYYY")}
                                        />

                                        <CardContent className={classes.cardContent}>

                                            <Typography>
                                                {tweet.text}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                <ChatBubbleOutlineRoundedIcon />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {tweet.user.favourites_count}
                                                </Typography>
                                            </Button>
                                            <Button size="small" color="primary">
                                                <ReplayRoundedIcon />
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {tweet.retweet_count}
                                                </Typography>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>}

                </Container>

            </Container>
        )
    }
}


export default withStyles(styles)(Display)