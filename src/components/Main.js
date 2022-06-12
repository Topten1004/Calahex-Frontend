import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";

import Navbar from "./Layouts/Navbar";
import Footer from "./Layouts/Footer";
import "aos/dist/aos.css";
import Routing from "./Routes";

AOS.init({ once: true });

const styles = (theme) => ({
    wrapper: {
        backgroundColor: theme.palette.common.white,
        overflowX: "hidden",
    },
});

function Main(props) {
    const { classes } = props;
    const [selectedTab, setSelectedTab] = useState(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const handleMobileDrawerOpen = useCallback(() => {
        setIsMobileDrawerOpen(true);
    }, [setIsMobileDrawerOpen]);

    const handleMobileDrawerClose = useCallback(() => {
        setIsMobileDrawerOpen(false);
    }, [setIsMobileDrawerOpen]);

    const selectLanding = useCallback(() => {
        document.title =
            "CALAHEX - Caribbean And Latin America Hybrid Exchange";
        setSelectedTab("Landing");
    }, [setSelectedTab]);

    const scrollTop = useRef(null);

  useEffect(() => {
    scrollTop.current.scrollIntoView({block: "start", behavior: "smooth"});
  }, [props.location.pathname])

    return (
        <div className={classes.wrapper} ref={scrollTop}>
            <Navbar
                selectedTab={selectedTab}
                selectTab={setSelectedTab}
                handleMobileDrawerOpen={handleMobileDrawerOpen}
                handleMobileDrawerClose={handleMobileDrawerClose}
                mobileDrawerOpened={isMobileDrawerOpen}
            />
            <Routing
                selectLanding={selectLanding}
            />
            {(props.location.pathname !== "/login" && props.location.pathname !== '/sign-up') && <Footer />}
        </div>
    );
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(withRouter(Main)));
