import React, { useState } from 'react';
import {
  Grid,
  Modal,
  Backdrop,
  Fade,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Fab,
  TextField,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import LineGraph from '../lineGraph';
import { ConnectorConsumer } from '../mqtt/connector';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    add: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      padding: theme.spacing(2, 4, 3),
    },
    modalRow: {
      width: '100%',
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    if (currentTopic) {
      setTopics([...topics, currentTopic]);
    }

    setOpen(false);
  };

  return (
    <ConnectorConsumer>
      {context => (
        <div className={classes.root}>
          <Grid container spacing={6} justify="center">
            {topics.map(topic => (
              <LineGraph key={topic} topic={topic} {...context} />
            ))}
          </Grid>

          <Fab
            className={classes.add}
            color="primary"
            aria-label="add"
            onClick={() => handleOpen()}
          >
            <Add />
          </Fab>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Specify the topic to subscribe to
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="topic"
                label="Topic"
                type="text"
                variant="outlined"
                onChange={event => setCurrentTopic(event.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubscribe} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </ConnectorConsumer>
  );
}

export default Dashboard;
