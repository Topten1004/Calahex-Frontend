
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.primary.main
  },
  heading: {
    fontSize: 12,
  },
  secondaryHeading: {
    fontSize: 12,
    color: 'white',
  },
  accordionSummary: {
    background: theme.palette.primary.main,
  },
  accordion: {
    border: 'none',
    boxShadow: 'none',
    padding: '0 30px',
    background: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  accordionDetail: {
    marginLeft: 20,
    background: theme.palette.primary.main,
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  subtitle: {
    color: theme.palette.background.default,
    fontSize: 12,
    marginBottom: 5
  },
  white: {
    color: 'white'
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const {title, subitems, keyword} = props;

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(isExpanded, panel, expanded)
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === keyword} onChange={handleChange(keyword)} className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.white}/>}
          aria-controls={`${keyword}bh-content`}
          id={`${keyword}bh-header`}
          className={classes.accordionSummary}
        >
          <Typography className={classes.secondaryHeading}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          {
            subitems.map((subitem, index) => (
              <Typography key={index} className={classes.subtitle}>
                {subitem.text}
              </Typography>
            ))
          }
        </AccordionDetails>
      </Accordion>
    </div>
  );
}