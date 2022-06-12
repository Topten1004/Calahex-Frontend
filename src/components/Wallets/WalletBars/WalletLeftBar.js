import React, {forwardRef, useContext, useState} from "react";
import {NavLink as RouterLink} from 'react-router-dom';
import {
    List,
    Button,
    Collapse
} from "@material-ui/core";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {LanguageContext} from '../../../utils/Language';
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import useStyles from './WalletSideBarStyle.js';
import Slide from "@material-ui/core/Slide";
import Hidden from "@material-ui/core/Hidden";
import jsonData from "./menu.json";

function WalletLeftBar(props) {
    const [ menu, setMenu ] = useState({});
    const { className, ...rest } = props;

    const classes  = useStyles();
    const handleClick = (item) => {
        let newData = {...menu, [item] : !menu[item]};
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
                        in={(menu[name]) ? false :  true}
                        timeout="auto"
                        unmountOnExit
                    >
                        {handleMenu(children, 1)}
                    </Collapse>
                </div>
            )
        })
    }
    const {dictionary} = useContext(LanguageContext);

    const drawer = (<div className={classes.sidebars}>
        <List {...rest} className={clsx(classes.root, className)}>
            {handleMenu(jsonData.menus)}
        </List>
    </div>);

    return (
        <Hidden mdDown>
            {drawer}
        </Hidden>
    );
}

export default WalletLeftBar;
