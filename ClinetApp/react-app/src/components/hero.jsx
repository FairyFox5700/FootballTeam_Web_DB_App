import * as React from "react";
import {
    Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import FootballersCardList from "../containers/footballers/footballerCardList";

const useStyles = makeStyles((theme) => ({
    mainText:{
        fontFamily: 'Goldman',
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
         url('https://vectorgrovepreview.azureedge.net/c/b42/cb4285e.jpg?st=2019-11-06T10%3A03%3A41Z&se=2039-12-31T22%3A00%3A00Z&sp=r&sv=2018-03-28&sr=c&sig=zblTCxEF2g7nMxSIOzivUbXvPyq%2B%2Fz5hxWjVoAbSdWw%3D')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "8rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    footballersContainer: {
        paddingTop: theme.spacing(3)
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        '& > *': {
            marginTop: theme.spacing(2),
        },
    }
}));

const Main= () => {
    const classes = useStyles();
    return(
        <div className={classes.mainText}>
            <Box className={classes.hero}>
                <Box>Football Team</Box>
            </Box>
            <Container maxWidth="lg" className = {classes.footballersContainer}>
                <Box my={4} className={classes.paginationContainer}>
                    <Pagination count={10} variant="outlined" />
                </Box>
                <FootballersCardList />
            </Container>

        </div>
    )
}
export default Main;
