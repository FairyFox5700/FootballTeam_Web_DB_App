import React, {useCallback, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./footballersActions";
import {useToasts} from "react-toast-notifications";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '345',
        '&:hover': {
            opacity: '0.8'
        }
    },
    image: {
        width: '100%',
        height: '95%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginBottom: '5px'
    }})
);

const CollectionItem  = ({match,item,...props}) =>{

    const dispatch = useDispatch();
    const { addToast } = useToasts()
    const {personId, firstName,middleName, placeOfBirth, imageUrl } = item;
    const classes = useStyles();
  
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.image}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWXwAuOv9ZWySUSLwKeMQiDFv2mkXLkY6eGg&usqp=CAU"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {firstName+' ' +middleName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {placeOfBirth}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small"   href={`/footballers/${personId}`} color="primary">
                    Details
                </Button>
                <Button size="small"  href={`/footballer-form/${personId}`}  color="primary">
                    Update
                </Button>
                <Button size="small" color="secondary" onClick={() => {
                   
                        props.handler(personId);
                    }}
              >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default (CollectionItem);