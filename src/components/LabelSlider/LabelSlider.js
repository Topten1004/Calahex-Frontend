import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0 10px"
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#36d9be',
    height: 4,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const marks = [
  {
    value: 0,
    label: '1x',
  },
  {
    value: 10,
    label: '5x',
  },
  {
    value: 20,
    label: '10x',
  },
  {
    value: 30,
    label: '20x',
  },
  {
    value: 40,
    label: '35x',
  },
  {
    value: 50,
    label: '50x',
  },
  {
    value: 60,
    label: '100x',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function LabelSlider() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Typography id="discrete-slider-custom" gutterBottom>
        Custom marks
      </Typography> */}
      {/* <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        max={60}
        valueLabelDisplay="off"
        marks={marks} marks
      /> */}
       <PrettoSlider  defaultValue={1} />
    </div>
    
  );
}