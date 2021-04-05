import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Modal
  } from "@material-ui/core";
import useStyles from '../styles/styles';
import imgSourceDefault from "../assets/candidate-logo.svg";
import loader from "../assets/loader.gif";
import * as actions from "../store/actions/constants";


const EmployeeCard = ({id, name, salary, age, img, onDelete}) => {
    const errorStatus = useSelector(state => state.employees.error);
	const isLoading = useSelector(state => state.employees.isLoading);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(null);
    const classes = useStyles();
	const dispatch = useDispatch();

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia 
                    className={classes.cardMedia}
                    image={img ? img : imgSourceDefault}
                    title={name}/>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {`id: ${id}`}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {`Salary: ${salary}`}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {`Age: ${age}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        onClick={() => setShowConfirmDeleteModal({ name, id })}
                        size="small" 
                        color="secondary"
                    >
                        Delete
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            <Modal
                open={Boolean(showConfirmDeleteModal)}
                onClose={() => {
                    setShowConfirmDeleteModal(null);
                    dispatch({ type: actions.RESET_ERROR });
                }}
                aria-labelledby="simple-modal-title"
            >
                <div className={classes.modal}>
                    {
                        !errorStatus 
                            ? 
                    (<h2 id="simple-modal-title">Do U Want To Delete {name} ?</h2>)
                            :
                    (<h2>{errorStatus.message}</h2>)
                    }
                    {
                        isLoading && (<img src={loader}/>)
                    }
                    <Button
                            size="small" 
                            color="primary"
                            onClick={() => onDelete(showConfirmDeleteModal.id)}
                        >
                            {!errorStatus ? "Confirm" : null}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default EmployeeCard;
