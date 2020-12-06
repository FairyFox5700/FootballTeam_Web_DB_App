import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {connect, useDispatch, useSelector} from "react-redux";
import {fetchAll} from "./rolesActions";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CollectionItem from "../footballers/footballerCollectionCardItem";
import FootballersCardList from "../footballers/footballerCardList";
import {bindActionCreators} from "redux";

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});


class  ResponsiveDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true,
            sidebar: null,
            footballers:[],
            mobileOpen:false,
            roleName:''
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onHandleDrawerToggle= this.onHandleDrawerToggle.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }
    onSidebarClick(role) {
        console.log(role.footballers)
        this.setState({ footballers: role.footballers, roleName:role.roleName});
    }

    onHandleDrawerToggle(){
        this.setState({mobileOpen: !this.state.mobileOpen});
    }
    componentDidMount() {
        this.props.fetchAll()
    }
    render() {
   
        const { error, loading, roles } = this.props;
        const { classes } = this.props;
        if (error) {
            return <div>Error! {error.message}</div>;
        }

        if (loading) {
            return <div>Loading...</div>;
        }
        const drawer = (
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error} </div>
                ) : (
                    <>
                        <List>
                            {roles.map((role, index) => (
                                <ListItem button onClick={() => this.onSidebarClick(role)} key={index}>
                                    <ListItemText primary={role.roleName}/>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </div>
        );

        return (
            <div className={classes.root}>
                <>
                    <CssBaseline/>

                    <nav className={classes.drawer} aria-label="mailbox folders">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                variant="temporary"
                                open={this.mobileOpen}
                                onClose={this.onHandleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}>
                                <IconButton onClick={this.onHandleDrawerToggle}>
                                </IconButton>
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    
                        <Container maxWidth='sm'  className={classes.content}>
                            {console.log(this.state.footballers)}
                            <FootballersCardList footballersList={this.state.footballers}/>
                        </Container>
                 
                </>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        roles: state.roles.roles,
        loading: state.roles.loading,
        error: state.roles.error
    }
}

const  mapDispatchToProp = (dispatch) => {
    return {
        fetchAll :  bindActionCreators(fetchAll, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(withStyles(styles)(ResponsiveDrawer));
