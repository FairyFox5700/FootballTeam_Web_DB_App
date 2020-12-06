import React, { Component } from 'react'
import { connect } from 'react-redux'
import withRouter from "react-router-dom/es/withRouter";



class Toolbar extends Component {

    logOut = () => {
        this.props.logOut()
            .then(() => {
                this.props.history.push('/login')
            })
    }

    goTo = (path) => {
        this.props.history.push(path)
    }

    render() {
        return (
            <div className=>
              іввіавіфв
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: ''
    }
}

const mapDispatchToProps = {
    logOut: "",
}

export default connect(
    mapStateToProps,
    null
)(withRouter(Toolbar))