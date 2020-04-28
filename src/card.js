import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Firestore from './services/firestore.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "./star.css"

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  Playbutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    margin: '0px',
  },
  Likersbutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'center',
    margin: '0px',
  },
  Likebutton: {
    width: 170,
    height: 30,
    backgroundColor: 'pink',
    alignItems: 'right',
    margin: '0px',
  },
});


function SingleCard({ name, author, gameLink, numberOfLikes, currentUser, gridID, creatorID }) {
  const classes = useStyles();
  // Whether the star should be gold
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [listOfPeopleWhoLiked, setListOfPeopleWhoLiked] = useState(null);


  async function likeGrid(currentUserId, gridID) {
    const like = await Firestore.add.like(currentUser.id, gridID);
    if (like == null) {
      console.log("add like failed");
       return false;
    }
    else{
      console.log("like added");
      console.log(like);
      return true;
    }

  }

  async function unlikeGrid(gridID) {
    const success = await Firestore.remove.like(currentUser.id, gridID);
    if (success === false) {
      console.log("remove like failed");
      return false;
    }
    console.log("removed like");
    console.log(success);
    return true
  }


  async function getListOfPeopleWhoLiked(gridID) {
    const listOfPeopleWhoLiked = await Firestore.get.usersWhoLikedGrid(gridID);
    if (listOfPeopleWhoLiked === null) { console.log("error"); return; }
    console.log("get all grid listOfPeopleWhoLiked success");
    console.log(listOfPeopleWhoLiked);
    setListOfPeopleWhoLiked(listOfPeopleWhoLiked);
  }


  useEffect(() => {
    getListOfPeopleWhoLiked(gridID);
  }, []);

  useEffect(() => {
    checkIfCurrentUserHasLiked();
  }, [listOfPeopleWhoLiked]);


  function checkIfCurrentUserHasLiked(){
    // if(userHasLiked == false){
    //   setStarColor("Like")
    // }
    if(listOfPeopleWhoLiked != null){
      for (let personWhoLiked in listOfPeopleWhoLiked ){
        if(currentUser.id == listOfPeopleWhoLiked[personWhoLiked].id){
            setUserHasLiked(true)
            break;
          }
      }
    }
  }

  const doLike = (userHasLiked, gridID) => {
    if(userHasLiked ==  false){ //&&user hasn't liked from db
      likeGrid(currentUser.id, gridID)
      setUserHasLiked(true)
    }
    else if(userHasLiked ==  true){
      unlikeGrid(gridID)
      setUserHasLiked(false)
      // for (let likedUser in likers ){
      //   if(currentUser.id = likers[likedUser].id){
      //       likers.splice(likedUser, 1)
      //        break;
      //     }
      //}
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    if (listOfPeopleWhoLiked.length != 0 ){
      setAnchorEl(event.currentTarget);
    }

  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}>
          <Button className={classes.Likebutton} size="small" color="primary" onClick={() => doLike(userHasLiked, gridID)}>

          <div className = "starImage">

             <img src = { userHasLiked ? "/star.png" : "/starGrey.png"}/>

          </div>

          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {listOfPeopleWhoLiked ? (listOfPeopleWhoLiked).map(function(personWhoLiked, key) {
               return < MenuItem > {personWhoLiked.displayName} </MenuItem>}) : ""}
          </Menu>
          </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <CardActionArea>
            By <Button href={'/profile/' + creatorID} >{author}</Button>
            </CardActionArea>
          </Typography>
        </CardContent>
      <CardActions>
        <Button className={classes.Playbutton} size="small" color="primary"  href={'/play/' + gridID}  >
          Play
        </Button>
        <Button  className={classes.Likersbutton} size="small" color="primary" aria-controls="simple-menu"  aria-haspopup="true" onClick={handleClick} >
          {numberOfLikes} {numberOfLikes == 1 ? "Like": "Likes"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SingleCard;
