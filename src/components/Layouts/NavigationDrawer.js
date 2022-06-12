import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    withStyles,
    IconButton,
    Typography,
    withWidth,
    isWidthUp,
    Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import { LanguageContext } from '../../utils/Language';

const styles = theme => ({
    closeIcon: {
        marginRight: theme.spacing(0)
    },
    white: {
        color: 'white'
    },
    headSection: {
        backgroundColor: theme.palette.primary.main,
        width: '100vw'
    },
    headShow: {
        marginTop: 160,
        zIndex: 0,
    },
    blackList: {
        backgroundColor: theme.palette.primary.main,
        // height: "110vh"
    },
    noDecoration: {
        textDecoration: "none !important"
    },
    signup: {
        borderRadius: 20,
        margin: 10,
        textTransform: 'none',
        textDecoration: "none !important",
        border: `1px solid white`,
        marginBottom: 50
    },
    login: {
        borderRadius: 20,
        margin: 10,
        border: `1px solid white`,
        background: 'white',
        textTransform: 'none',
        color: theme.palette.primary.main,
        textDecoration: "none !important",
        marginBottom: 50
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
    }
});

function NavigationDrawer(props) {
    const {
        width,
        open,
        onClose,
        anchor,
        classes,
        menuItems,
        selectedItem,
        theme
    } = props;

    const { dictionary } = useContext(LanguageContext);

    useEffect(() => {
        window.onresize = () => {
            if (isWidthUp("sm", width) && open) {
                onClose();
            }
        };
    }, [width, open, onClose]);

    return (
        <Drawer variant="temporary" className={classes.headerShow} open={open} onClose={onClose} anchor={anchor}>
            <List className={classes.headSection}>
                <ListItem
                    style={{
                        paddingTop: theme.spacing(0),
                        paddingBottom: theme.spacing(0),
                        height: "100%",
                        justifyContent: anchor === "left" ? "flex-start" : "flex-end"
                    }}
                    disableGutters
                >
                    <ListItemIcon className={classes.closeIcon}>
                        <IconButton onClick={onClose} aria-label="Close Navigation">
                            <CloseIcon className={classes.white} fontSize='small' />
                        </IconButton>
                    </ListItemIcon>
                </ListItem>
            </List>
            <List className={classes.blackList}>
                {menuItems.map((element, i) => {
                    if (element.link) {
                        return (
                            <ListItem
                                button
                                selected={selectedItem === element.name}
                                /**
                                 * We disable ripple as it will make a weird animation
                                 * with primary and secondary color
                                 */
                                key={element.name}
                                className={clsx(classes.listText, (i === 0) && classes.borderTop)}
                                disableRipple
                                disableTouchRipple
                                onClick={onClose}
                            >
                                <Link
                                    to={element.link}
                                    className={clsx(classes.noDecoration, classes.width100)}
                                    onClick={onClose}
                                >
                                    {element.icon ? (<ListItemIcon>{element.icon}</ListItemIcon>) : ''}
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" className="text-white">
                                                {element.name}
                                            </Typography>
                                        }
                                    />
                                </Link>
                            </ListItem>
                        );
                    }
                    return (
                        <ListItem button key={element.name} onClick={element.onClick}>
                            <ListItemIcon>{element.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" className="text-white">
                                        {element.name}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    );
                })}
                <ListItem>
                    <Link to="sign-up" className={classes.noDecoration} onClick={onClose}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            className={classes.signup}
                        >
                            {dictionary.signup}
                        </Button>
                    </Link>
                    <Link to="login" className={classes.noDecoration} onClick={onClose}>
                        <Button
                            color="default"
                            variant="contained"
                            size="large"
                            className={classes.login}
                        >
                            {dictionary.login}
                        </Button>
                    </Link>
                </ListItem>
            </List>
        </Drawer>
    );
}

NavigationDrawer.propTypes = {
    anchor: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    selectedItem: PropTypes.string
};

export default withWidth()(
    withStyles(styles, { withTheme: true })(NavigationDrawer)
);
