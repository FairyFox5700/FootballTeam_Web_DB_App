import React, {useEffect, useState} from "react";
import {Grid, makeStyles, withStyles} from "@material-ui/core";
import {connect, useDispatch} from "react-redux";
import CollectionItem from "./footballerCollectionCardItem";
import {bindActionCreators} from "redux";
import {fetchAllWithRoles} from "./footballersActions";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import * as actions from "./footballersActions";
import {useToasts} from "react-toast-notifications";


const styles= () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title:{
        fontSize:"38px",
        margin:"0 auto 30px"
    },
    gridList: {
        width: 500,
        height: 450,
    },
    items: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: '10px',
        collectionItem: {
            marginBottom:'30px'
        }
    }
});

class  FootballersCardList extends React.Component {
    constructor(props) {
        super(props);
        this.deleteFootballer = this.deleteFootballer.bind(this);
    }
    componentDidMount() {
        if(this.props.footballersList.length===0){
            this.props.fetchAll()
        }
       
    }

    deleteFootballer(id) {
        
        if (window.confirm('Are you sure to delete this footballer?')) {
            this.props.deleteFootballer(id, () => {})
            this.props.fetchAll()
        }

    }
    render()
    {

        const {classes} = this.props;
        const { error, loading, footballersList } = this.props;
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <Container maxWidth='lg' className={classes.root} >
                <h2 className={classes.title}>{this.props.roleName}</h2>
                    <div  className= {classes.items}>
                        {
                            this.props.footballersList.map((item, index) => <CollectionItem key={index} handler = {this.deleteFootballer} item={item}/>)
                        }
                        <Button variant="contained" href={`/footballer-form`}  color="secondary">
                            Add footballer
                        </Button>
                    </div>
                
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        footballersList: state.footballers.footballers,
        loading: state.footballers.loading,
        error: state.footballers.error
    }
}

const  mapDispatchToProp = (dispatch) => {
    return {
        fetchAll :  bindActionCreators(fetchAllWithRoles, dispatch),
        deleteFootballer: bindActionCreators(actions.deleteFootballer, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles, { withTheme: true })(FootballersCardList));








