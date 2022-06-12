import React, {forwardRef, useContext, useState} from "react";
import PropTypes from "prop-types";
import {
    withStyles,
    withWidth,
    Button, List, Collapse, colors, useMediaQuery, Container, Grid,
} from "@material-ui/core";
import {LanguageContext} from '../../../utils/Language';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import clsx from "clsx";
import jsonData from "./menu.json";
import {NavLink as RouterLink, useHistory} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import {ButtonGroup} from "react-bootstrap";
import WalletProfileSecurity from "./WalletRightBar";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CloudCheck from "../../../assets/cloud-check.png";
import UserVerify from "../../../assets/user_verify.png";
import Box from "@material-ui/core/Box";

const styles = theme => ({
    headSection: {
        backgroundColor: theme.palette.primary.main,
        width: '100vw',
        padding: theme.spacing(0, 1),
        minHeight: 48,
        marginTop: 60,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'flex-end',
        },
        [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between',
        },
    },
    ButtonGroup: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        "& button": {
            width: '45%',
            fontSize: 11,
            padding: "4px 3px",
            margin: 3
        }
    },
    depositButton: {
        borderRadius: 5,
        background: theme.palette.primary.footer,
        textTransform: 'none',
        color: 'white',
        textDecoration: "none !important",
        padding: '3px 7px',
        fontSize: 14,
        margin: '3px 7px',
    },
    listText: {
        textAlign: 'cetner',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    },
    borderTop: {
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
    },
    width100: {
        width: '100%'
    },
    menuButton: {
        color: 'white'
    },
    sidebars: {
        minWidth: 270,
        [theme.breakpoints.up('md')]: {
            height: '100%',
        },
        height: '100vh',
        overflowY: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: 20,
        paddingTop: 0,
        textAlign: 'right'
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
    },
    btnRoot: {
        paddingLeft: "25px",
        display: 'flex',
        justifyContent: "space-between !important"
    },
    drawerPaper: {
        width: 270,
        position: 'absolute'
    },
    subMenu: {
        paddingLeft: "50px !important",
    },
    active: {
        background: theme.palette.primary.footer,
        padding: '10px 8px',
        borderRadius: 5,
        color: 'white',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        paddingLeft: "25px",
    },
    drawer: {
        maxWidth: 270,
    },
    profilePaper: {
        position: 'absolute'
    },
    bodySection: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 400,
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '0px 0px',
        margin: 0
    },
    bodyheader: {
        backgroundColor: 'white',
        display: 'flex',
        padding: '0px 15px 0px 15px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid black'
    },
    profilebody: {
        backgroundColor: theme.palette.primary.footer,
        borderRadius: 10,
        width: '100%',
        padding: 15,
        marginTop: 15
    },
    mainbody: {
        padding: 20,
    },
    textbody: {
        color: 'white',
        fontSize: 12,
        marginBottom: 10
    },
    enableButton: {
        borderRadius: 20,
        background: theme.palette.primary.main,
        textTransform: 'none',
        color: 'white',
        padding: '0px 5px 0px 5px',
        fontSize: 12,
        textDecoration: "none !important",
        marginTop: 20
    },
    image: {
        width: 80,
        height: 60
    }
});

function WalletTopBar(props) {
    const {
        classes, window, ...rest
    } = props;
    const history = useHistory();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [menu, setMenu] = useState({});
    const isXs = useMediaQuery('(max-width: 500px)');
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const profileDrawerToggle = () => {
        setProfileOpen(!profileOpen);
    };
    const handleClick = (item) => {
        let newData = {...menu, [item]: !menu[item]};
        setMenu(newData);
    }
    const CustomRouterLink = forwardRef((props, ref) => (
        <div ref={ref} style={{flexGrow: 1}}>
            <RouterLink {...props} />
        </div>
    ));
    const handleMenu = (children, level = 0) => {
        return children.map(({children, name, url, links}) => {
            if (!children) {
                return (
                    <List component="div" disablePadding key={name}>
                        <ListItem
                            className={classes.item}
                            disableGutters
                            style={{padding: "0px"}}
                            key={name}
                        >
                            <Button
                                className={clsx({
                                    [classes.btnRoot]: true,
                                    [classes.button]: props.name !== name,
                                    [classes.active]: props.name === name,
                                    [classes.subMenu]: level
                                })}
                                component={CustomRouterLink}
                                to={url}
                            >
                                {name}
                            </Button>
                        </ListItem>
                    </List>
                )
            }
            return (
                <div key={name}>
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={name}
                        onClick={() => handleClick(name)}
                    >
                        <Button
                            className={clsx({
                                [classes.btnRoot]: true,
                                [classes.button]: props.name !== name,
                                [classes.active]: props.name === name,
                                [classes.subMenu]: level
                            })}>
                            {name} {menu[name] ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}
                        </Button>
                    </ListItem>
                    <Collapse
                        in={(menu[name]) ? false : true}
                        timeout="auto"
                        unmountOnExit
                    >
                        {handleMenu(children, 1)}
                    </Collapse>
                </div>
            )
        })
    }
    const container = window !== undefined ? () => window().document.body : undefined;
    const {dictionary} = useContext(LanguageContext);
    const drawer1 = (<div className={classes.sidebars}>
        <IconButton aria-label="delete" color="primary" onClick={handleDrawerToggle} className={classes.closeButton}>
            <ArrowBackOutlinedIcon/>
        </IconButton>
        <List {...rest} className={clsx(classes.root, classes)}>
            {handleMenu(jsonData.menus)}
        </List>
    </div>);

    return (
        <>
            <div className={classes.headSection}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden lgUp>
                    <IconButton aria-label="delete" className={classes.menuButton} onClick={handleDrawerToggle}>
                        <ArrowForwardOutlinedIcon/>
                    </IconButton>
                </Hidden>
                <div className={clsx(isXs && classes.ButtonGroup)} style={{marginRight:30,marginLeft:30}}>
                    <Button variant="contained" className={classes.depositButton} onClick={()=>{history.push('/wallet/exchange-account/deposit')}}>
                        Deposit
                    </Button>
                    <Button variant="contained" className={classes.depositButton} onClick={()=>{history.push('/wallet/exchange-account/withdraw')}}>
                        Withdraw
                    </Button>
                    <Button variant="contained" className={classes.depositButton} onClick={()=>{history.push('/wallet/account-overview')}}>
                        Accounts
                    </Button>
                    <Button variant="contained" className={classes.depositButton} onClick={()=>{history.push('/wallet/transfer-balances')}}>
                        Transfer
                    </Button>
                    {/* <Button variant="contained" className={classes.depositButton}>
                        Buy with Flat
                    </Button>
                    <Button variant="contained" className={classes.depositButton}>
                        Sell for Flat
                    </Button> */}
                </div>
                <Hidden lgUp>
                    <IconButton aria-label="delete" className={classes.menuButton} onClick={profileDrawerToggle} >
                        <ArrowBackOutlinedIcon/>
                    </IconButton>
                </Hidden>
            </div>
            <Drawer
                container={container}
                variant="temporary"
                anchor={'right'}
                open={profileOpen}
                onClose={profileDrawerToggle}
                classes={{
                    paper: classes.profilePaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Box className={classes.bodySection}>
                    <div className={classes.bodyheader}>
                        <p>Profile & Security</p>
                        <IconButton aria-label="delete" color="primary" onClick={profileDrawerToggle} className={classes.closeButton}>
                            <ArrowForwardOutlinedIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.mainbody}>
                        <Container className={classes.profilebody}>
                            <Typography  className={classes.textbody}>Security</Typography>
                            <Typography  className={classes.textbody}>Protect your assets by adding an extra layer of security with 2-Step Verification.</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button variant="contained" className={classes.enableButton}>
                                        Enable 2FA
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <img
                                        className={classes.image}
                                        src={CloudCheck}
                                        alt="cloudcheck"
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                        <Container className={classes.profilebody}>
                            <Typography  className={classes.textbody}>LIMITS & FEATURES</Typography>
                            <Typography  className={classes.textbody}>Get increased limits and advanced features by providing a bit more profile information.</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button variant="contained" className={classes.enableButton}>
                                        Get started
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <img
                                        className={classes.image}
                                        src={UserVerify}
                                        alt="userverify"
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Box>
            </Drawer>
            <Hidden lgUp>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer1}
                </Drawer>
            </Hidden>
        </>
    );
}

WalletTopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(
    withStyles(styles, {withTheme: true})(WalletTopBar)
);
