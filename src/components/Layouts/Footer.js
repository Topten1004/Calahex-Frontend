import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    Button,
    Grid,
} from "@material-ui/core";
import clsx from 'clsx';

import LogoImage from "../../assets/logo_footer.png";



const styles = makeStyles(theme => ({
    jumbotron: {
        maxWidth: theme.layout.footerWidth,
        width: '100%',
        margin: '0 auto',
        padding: '10px 0',
        color: 'white'
    },
    footerCopyright: {
        background: theme.palette.primary.footer,
    },
    bod: {
        background: theme.palette.primary.footer,
        borderBottom: '1px solid white'
    },
    textUppercase: {
        textTransform: "uppercase",
        fontFamily: 'inherit',
        fontWeight: '500',
        lineHeight: '1.1',
    },
    center: {
        textAlign: 'center'
    },
    signup: {
        borderRadius: 20,
        marginRight: 20,
        background: 'white',
        textTransform: 'none'
    },
    login: {
        borderRadius: 20,
        marginLeft: 20,
        border: `1px solid ${theme.palette.primary.main}`,
        background: 'white',
        textTransform: 'none'
    },
    listItemText: {
        color: 'white',
        text: 'center',
        textDecoration: 'none',
        lineHeight: '1'
    },
    item: {
        fontSize: '19px',
        marginBottom: '30px'
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
            alignItems: 'center'
        },
    },
    copyrightListItem: {
        width: 'auto',
    },
    bobListItem: {
        paddingTop: '0',
        display: 'block',
        textAlign: 'center'
    },
    mt5: {
        marginTop: '5px'
    },
    mt20: {
        marginTop: 20
    },
    font36: {
        fontSize: 36
    },
    mb30: {
        marginBottom: 30
    },
    font19: {
        fontSize: 19
    },
    pt10: {
        paddingTop: 10
    },
    itembaner: {
        [theme.breakpoints.down("xs")]: {
            margin: '0 auto'
        },
        [theme.breakpoints.down("sm")]: {
            margin: '0 auto'
        },
    },
    copirightbanner: {
        [theme.breakpoints.down("xs")]: {
            display: 'flex'
        },
        [theme.breakpoints.down("sm")]: {
            display: 'flex'
        },
    }
}));


function Footer(props) {

    const { isAuthenticated } = props;

    const classes = styles();

    const bobMenuItems = [
        {
            item: 'About Calahex',
            md: 2 + isAuthenticated,
            xs: 12,
            subitems: [
                {
                    subitem: 'Fee Info',
                    link: '/fee-info'
                },
                {
                    subitem: 'Listed Assets',
                    link: '/listed-assets'
                },
                {
                    subitem: 'Refferal',
                    link: '/comming-soon'
                },
                {
                    subitem: 'Job Opportunities',
                    link: '/comming-soon'
                },

            ]
        },
        {
            item: 'Futures Trading',
            md: 2 + isAuthenticated,
            xs: 12,
            subitems: [
                {
                    subitem: 'Trade',
                    link: '/crypto-exchange'
                },
                {
                    subitem: 'Futures Fee Info',
                    link: '/comming-soon'
                },
                {
                    subitem: 'Futures Contract Specification',
                    link: '/comming-soon'
                },
            ]
        },
        {
            item: 'Social',
            md: 1 + isAuthenticated,
            xs: 12,
            subitems: [
                {
                    subitem: 'Twitter',
                    link: 'https://twitter.com/calahexcom'
                },
                {
                    subitem: 'Facebook',
                    link: 'https://www.facebook.com/calahexcom'
                },
                {
                    subitem: 'Instagram',
                    link: 'https://www.instagram.com/calahexcom'
                },
                {
                    subitem: 'Linkedin',
                    link: 'https://www.linkedin.com/in/calahex-caribbean-latin-america-hybrid-exchange-387574200'
                },
            ]
        },
        {
            item: 'Support',
            md: 1 + isAuthenticated,
            xs: 12,
            subitems: [
                {
                    subitem: 'Contact',
                    link: 'mailto:customerservice@calahex.com'
                },
                {
                    subitem: 'Support',
                    link: 'mailto:support@calahex.com'
                },
            ]
        },
        {
            item: 'Languages',
            md: 1 + isAuthenticated,
            xs: 12,
            subitems: [
                {
                    subitem: 'English',
                    link: '/comming-soon'
                },
            ]
        }
    ]

    const menuItems = [
        {
            name: 'Terms of Use',
            link: '/terms',
        },
        {
            name: 'Privacy Policy',
            link: '/private-policy',
        },
        {
            name: 'Cookie Policy',
            link: '/cookie-policy',
        },
        {
            name: 'E-Sign Consent',
            link: '/esign',
        },
    ];

    return (
        <footer>
            <div className={classes.bod}>
                <div className={classes.jumbotron}>
                    <Grid container>
                        {!isAuthenticated &&
                            <Grid item xs={12} md={4} className={classes.mb30} >
                                <div className={classes.center}>
                                    <h1 className={clsx(classes.textUppercase, classes.font36, classes.mb30)}>Let's trade</h1>
                                    <Link to="/sign-up" className={classes.listItemText}>
                                        <Button
                                            color="default"
                                            variant="contained"
                                            size="small"
                                            className={classes.signup}
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                    <Link to="/login" className={classes.listItemText}>
                                        <Button
                                            color="default"
                                            variant="contained"
                                            size="small"
                                            className={classes.login}
                                        >
                                            Log In
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>

                        }
                        {
                            bobMenuItems.map(item => {
                                return (
                                    <Grid item xs={item.xs} md={item.md} key={item.item}>
                                        <div className={classes.center}>
                                            <h1 className={clsx(classes.textUppercase, classes.font19)}>{item.item}</h1>
                                            <List>
                                                {
                                                    item.subitems.map(subitem => {
                                                        return (
                                                            <ListItem className={classes.bobListItem} key={subitem.subitem}>
                                                                <a
                                                                    href={subitem.link}
                                                                    className={classes.listItemText}>
                                                                    {subitem.subitem}
                                                                </a>
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </div>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
            <div className={classes.footerCopyright}>
                <div className={classes.jumbotron}>
                    <Grid container>
                        <Grid item xs={12} md={4} sm={12}>
                            <Link
                                to={"/"}
                                display="inline"
                            >
                                <div className={clsx(classes.center, classes.pt10)}>
                                    <img
                                        src={LogoImage}
                                        alt="Fooer logo"
                                    />
                                </div>
                            </Link>
                        </Grid>
                        <Grid item md={7} sm={12} xs={12} className={classes.copirightbanner}>
                            <div className={clsx(classes.mt5, classes.center, classes.itembaner)}>
                                <List className={classes.navigationContainer}>
                                    {menuItems.map(element => {
                                        return (
                                            <ListItem key={element.name} className={classes.copyrightListItem}>
                                                <Link
                                                    to={element.link}
                                                    className={classes.listItemText}
                                                >
                                                    {element.name}
                                                </Link>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
