import React, { useEffect } from "react";
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { Grid, Button, useMediaQuery } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AppleIcon from '@material-ui/icons/Apple';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PropTypes from "prop-types";

import Header from "../../components/Home/Header";
import TradingImage from '../../assets/trading_img.jpg';
import ListingImage from '../../assets/listing.png';
import StakingImage from '../../assets/stacking_img.jpg';
import MobileImage from '../../assets/mobile1.png';
import CommunityImage from '../../assets/community.png';


const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      width: '100%',
      marggin: 0,
      padding: 40
    },
    container: {
      maxWidth: theme.layout.contentWidth,
      width: '100%',
      margin: '0 auto',
      paddingTop: 20,
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '15px',
    },
    cardImage: {
      padding: 30,
      [theme.breakpoints.down("xs")]: {
        order: 1
      },
      [theme.breakpoints.down("sm")]: {
        order: 1
      },
    },
    cardContent: {
      [theme.breakpoints.down("xs")]: {
        order: 2
      },
      [theme.breakpoints.down("sm")]: {
        order: 2
      },
    },
    cardText: {
      padding: '20px 10%',
    },
    cardTitle: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      textTransform: "uppercase",
      fontWeight: '500',
      marginBottom: 30,
      fontSize: 26
    },
    cardDescription: {
      fontSize: 19,
      fontWeight: '500'
    },
    round: {
      borderRadius: 25,
      padding: '10px, 20px',
      background: theme.palette.primary.main,
      color: 'white',
      textTransform: 'initial',
      textDecoration: 'none',
      margin: '10px 20px'
    },
    mb30: {
      marginBottom: 30
    },
    bgGray: {
      background: theme.palette.background.gray
    },
    center: {
      textAlign: 'center'
    },
    right: {
      textAlign: 'right'
    },
    detail: {
      color: theme.palette.primary.main,
      fontWeith: '400',
      fontSize: 16,
      textDecoration: 'none',
      marginRight: 20
    },
    socialIcons: {
      marginTop: 15,
      display: 'flex',
      justifyContent: 'flex-end'
    },
    social: {
      fontSize: 50,
      [theme.breakpoints.down("sm")]: {
        fontSize: 45
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: 35
      },
    },
    textDecoNone: {
      textDecoration: 'none'
    },
    pt50: {
      paddingTop: 50
    },
    pt30: {
      paddingTop: 30
    },
    p20: {
      paddingRight: 20,
      paddingLeft: 20
    },
    facebook: {
      color: '#2091f5'
    },
    mt70: {
      marginTop: 70
    },
    twitter: {
      color: '#7ac6f3'
    },
    instagram: {
      color: '#0c4475'
    },
    linkedin: {
      color: '#055da6'
    },
    pl0: {
      paddingLeft: 0
    }
  }));
  

const Landing = (props) => {

    const classes = useStyles();
    const { selectLanding, isAuthenticated } = props;
    const tradingImg = TradingImage;
    const listingImg = ListingImage;
    const mobileImg = MobileImage;
    const stakingImg = StakingImage;
    const communityImg = CommunityImage;
    const isXs = useMediaQuery('(max-width:400px)');
    useEffect(() => {
        selectLanding();
    }, [selectLanding]);

    useEffect(() => {
      console.log(isAuthenticated)
    }, [isAuthenticated])

    return (
        <div className={classes.root}>
          <Header />
          <Grid container className={classes.container} data-aos={'fade-up'}>
            <Grid item md={6} className={classes.cardImage}>
              <img 
                className={classes.image}
                src={tradingImg}
                alt="trading"
              />
            </Grid>
            <Grid item md={6} className={classes.cardContent}>
              <div className={classes.cardText}>
                <h1 className={classes.cardTitle}>Trading</h1>
                <h3 className={classes.cardDescription}>Buy, sell and trade. Buy ETH/USDT with your debit and credit card from your Calahex Wallet. Get your crypto wallet going with 200+ spot trading pairs and 19+ margin pairs</h3>
              </div>
              <div className={classes.center}>
                {/* <Link to={"/margin-trading"} className={classes.textDecoNone}>
                  <Button
                    color="default"
                    variant="contained"
                    size="small"
                    className={clsx(classes.round, classes.mb30)}
                  >
                  Margin trading
                  </Button>
                </Link> */}
                <Link to={"/future-trading"} className={classes.textDecoNone}>
                  <Button
                    color="default"
                    variant="contained"
                    size="small"
                    className={clsx(classes.round, classes.mb30)}
                  >
                  Futures Trading
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid container className={clsx(classes.container, classes.bgGray)} data-aos={'fade-up'}>
            <Grid item md={6}  className={classes.cardContent}>
              <div className={classes.cardText}>
                <h1 className={classes.cardTitle}>listing</h1>
                <h3 className={classes.cardDescription}>Life is full of opportunities and so is Calahex. We root for the small and medium size businesses because they are the pillars of any economy. Get listed now on the cheapest platform there is, and meet a world full of investors</h3>
              </div>
              <div className={classes.center}>
                <Button
                  color="default"
                  variant="contained"
                  size="small"
                  className={clsx(classes.round, classes.mb30)}
                  onClick={()=>{window.open('/comming-soon', '_blank');}}
                >
                Calahex.org
                </Button>
              </div>
            </Grid>
            <Grid item md={6} className={classes.cardImage}>
              <img 
                className={classes.image}
                src={listingImg}
                alt="listing"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} data-aos={'fade-up'}>
            <Grid item md={6} className={classes.cardImage}>
              <img 
                className={classes.image}
                src={stakingImg}
                alt="trading"
              />
            </Grid>
            <Grid item md={6}  className={classes.cardContent}>
              <div className={classes.cardText}>
                <h1 className={classes.cardTitle}>staking</h1>
                <h3 className={classes.cardDescription}>Let our CAX Token do all the work for you. Hold CAX and receive regular interest directly into your account with our simplified staking system. No binding periods, no problem, just relax and enjoy.</h3>
              </div>
              <div className={classes.center}>
                <Link to={"/comming-soon"} className={classes.textDecoNone}>
                  <Button
                    color="default"
                    variant="contained"
                    size="small"
                    className={clsx(classes.round, classes.mb30)}
                  >
                  Deposit CAX
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
          <Grid container className={clsx(classes.container, classes.bgGray)} data-aos={'fade-up'}>
            <Grid item md={6}  className={classes.cardContent}>
              <div className={classes.cardText}>
                <h1 className={classes.cardTitle}>mobile</h1>
                <h3 className={classes.cardDescription}>Trade when, how and where you want. Trade, deposit, withdraw and transfer using our mobile app.</h3>
              </div>
              <div className={classes.center}>
                <Link to={"/comming-soon"} className={classes.textDecoNone}>
                  <Button
                    color="default"
                    variant="contained"
                    size="small"
                    className={clsx(classes.round, classes.mb30)}
                    startIcon={<PlayArrowIcon />}
                  > Download on Google Play
                  </Button>
                </Link>
                <Link to={"/comming-soon"} className={classes.textDecoNone}>
                  <Button
                    color="default"
                    variant="contained"
                    size="small"
                    className={clsx(classes.round, classes.mb30)}
                    startIcon={<AppleIcon />}
                  > Download on App Store
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item md={6} className={classes.cardImage}>
              <img 
                className={classes.image}
                src={mobileImg}
                alt="mobile"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.container} data-aos={'fade-up'}>
            <Grid item md={6} className={clsx(classes.cardContent, classes.pt30, classes.p20, isXs && classes.pl0)}>
              <h1 className={classes.cardTitle}>community</h1>
              <h3 className={classes.cardDescription}> Don't wait to join our community. We are a lively bunch. Keep up with us all over the world. Facebook, Twitter, Instagram and Linkedin you will find us screaming about Crypto all the time.</h3>
              <h1 className={classes.cardTitle}>24/7 Support: </h1>
              <h3 className={classes.cardDescription}> We are here for you. So if you have any questions or need guidance, let us know. Will take care of all your issues and resolve them a.s.a.p.</h3>
              <div className={classes.right}> <Link to={'/comming-soon'} className={classes.detail}>Contact</Link></div>
              <h1 className={classes.cardTitle}>Job Opportunities:  </h1>
              <h3 className={classes.cardDescription}> We are the coolest digital asset exchange in the world. If you come on board, you will enjoy the ride. If you are cool and smart than consider us family!</h3>
              <div className={classes.right}> <Link to={'/comming-soon'} className={classes.detail}>Details...</Link></div>
            </Grid>
            <Grid item md={6} className={clsx(classes.pt50, classes.mt70)}>
              <img 
                className={classes.image}
                src={communityImg}
                alt="community"
              />
              <div className={classes.socialIcons}>
                <a href="https://www.facebook.com/calahexcom"><FacebookIcon className={clsx(classes.social, classes.facebook)} /></a>
                <a href="https://twitter.com/calahexcom"><TwitterIcon className={clsx(classes.social, classes.twitter)} /></a>
                <a href="https://www.instagram.com/calahexcom"><InstagramIcon className={clsx(classes.social, classes.instagram)} /></a>
                <a href="https://www.linkedin.com/in/calahex-caribbean-latin-america-hybrid-exchange-387574200"><LinkedInIcon className={clsx(classes.social, classes.linkedin)} /></a>
              </div>
            </Grid>
          </Grid>
        </div>
    );
}

Landing.propTypes = {
    selectLanding: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);