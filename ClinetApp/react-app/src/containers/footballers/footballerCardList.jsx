import React, {useEffect, useState} from "react";
import {Grid, makeStyles, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import CollectionItem from "./footballerCollectionCardItem";
import {bindActionCreators} from "redux";
import {fetchAllWithRoles} from "./footballersActions";
import Container from "@material-ui/core/Container";

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
    }
    componentDidMount() {
        if(this.props.footballersList.length===0){
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
                            this.props.footballersList.map((item, index) => <CollectionItem key={index} item={item}/>)
                        }
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
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles, { withTheme: true })(FootballersCardList));








