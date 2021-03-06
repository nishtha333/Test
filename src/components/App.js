import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './Home'
import Nav from './Nav'
import Login from './User/Login'
import BruteForce from './User/BruteForce'
import RegisterUser from './User/RegisterUser'
import Profile from './User/Profile'
import ProfileUpdatedSuccess from './User/ProfileUpdatedSuccess'
import RegistrationSuccessful from './User/RegistrationSuccessful'
import { init, subscribeStocks } from '../store'

class App extends Component {

    componentDidMount() {
        this.props.init()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authenticatedUser.stocks !== this.props.authenticatedUser.stocks) {
            this.props.subscribeStocks(this.props.authenticatedUser.stocks)
        }
    }

    render() {
        return (
            <Router>
                <Fragment>
                <CssBaseline />
                <Route path="/" render={({ history }) => <Nav history={history} />} />
                <Switch>
                    <Route path="/login" render={({ history }) => <Login history={history} />}/>
                    <Route path="/bruteForce" render={({ history }) => <BruteForce history={history} />}/>
                    <Route path="/register" component={RegisterUser} />
                    <Route path="/registerSuccess" component={RegistrationSuccessful} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/profileUpdated" component={ProfileUpdatedSuccess} />
                    <Route exact path="/" render={({ history }) => <Home history={history} />} /> 
                </Switch>
                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = ({authenticatedUser}) => {
    return {
        authenticatedUser
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () =>  dispatch(init()),
        subscribeStocks: (stocks) => dispatch(subscribeStocks(stocks)),
    }   
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = {
    "@global": {
		body: {
            //backgroundImage: "url('/dist/backgroundImage.png')",
            backgroundColor: "white"
        }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))