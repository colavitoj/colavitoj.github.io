import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const mainFeaturedPost = {
  title: "Welcome to the Dungeon Master's Toolbox",
  description:
    "Check out our resources in the sidebar or have a look at our recommended videos of the week.",
  image: 'https://source.unsplash.com/Oe3Qn4zgFR4',
};

const featuredPosts = [
  {
    title: 'Types of Players',
    date: 'Aug 16',
    description:
      'An informative video from Matt Colville, educating DMs on the various player "types" you might encounter throughout your DMing career. A must watch for anyone looking to run a particular kind of game and struggling to find the right players.',
    videoLink: 'https://www.youtube.com/watch?v=LQsJSqn71Fw&t=1s'
  },

  {
    title: 'Running Your First Game',
    date: 'Aug 16',
    description:
      'This is an extremely informative video covering the very basics of running your first game as a DM. At just under 20 minutes, this is a great introduction for anyone who is looking to get into the hobby.',
    videoLink: 'https://www.youtube.com/watch?v=aBOH8YLUPjE'
  },
];

const HomePage = () => {
  const classes = useStyles();

  return (
    <div>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>

    </div>
  );
}

export default HomePage