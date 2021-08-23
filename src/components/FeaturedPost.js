import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Link, Card, CardContent, Button, makeStyles } from '@material-ui/core/';



const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 120,
    height: 120
  },
  linkButton: {
    textDecoration: 'none',
    underline: 'none',
    "&:hover": {
      color: '#FFFFFF'
    },
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>

            <Button variant="contained" color="secondary" underline="none" component={Link} className={classes.linkButton} href={post.videoLink} >Watch Here</Button>

          </CardContent>
        </div>
      </Card>

    </Grid >
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
