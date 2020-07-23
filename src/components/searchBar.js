import React, { Component } from 'react';
import{ Avatar,Button,CssBaseline,TextField,Grid,Typography,Container} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import { withStyles } from '@material-ui/core/styles';




const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sub: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#00ADE2'//theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        backgroundColor: '#00ADE2',
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});



class SearchBar extends Component {

    state = {
        text: ""
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { text } = this.state
        if (text.length == 0) {
            alert("Please type a keyword to search")
        } else {
            this.props.history.push({
                pathname: '/search',
                // search: '?query=abc',
                state: { query: this.state.text }
            })
        }
    }



    render() {
        const { classes } = this.props

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <div className={classes.sub}>
                        <Typography component="h1" variant="h5">
                            Tweets
            </Typography><span><Avatar className={classes.avatar}>
                            <TwitterIcon />
                        </Avatar></span> <Typography component="h1" variant="h5">
                            Search
            </Typography>
                    </div>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="search"
                                    label="Search"
                                    name="search"
                                    onChange={(event) => this.setState({ text: event.target.value })}
                                />
                            </Grid>
                        </Grid>

                        <div className={classes.button}>
                            <Button variant="contained" color="primary" type="submit" className={classes.submit} onClick={this.onSubmit}>
                                SEARCH
                            </Button>
                        </div>



                    </form>
                </div>

            </Container>
        );
    }
}


export default withStyles(styles)(SearchBar)