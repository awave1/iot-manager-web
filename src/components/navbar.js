import { Link } from '@reach/router';
import React, { useState } from 'react';
import { AppBar, Toolbar, Tab, Tabs, Grid } from '@material-ui/core';
import {
  DashboardRounded,
  DevicesOtherRounded,
  SettingsRounded,
} from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    fullHeight: {
      ...theme.mixins.toolbar,
    },
  })
);

function Navbar() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const tabs = [
    {
      label: 'Dashboard',
      value: 0,
      to: '/',
      icon: <DashboardRounded />,
    },
    {
      label: 'Devices',
      value: 1,
      to: '/devices',
      icon: <DevicesOtherRounded />,
    },
    {
      label: 'Settings',
      value: 2,
      to: '/settings',
      icon: <SettingsRounded />,
    },
  ];

  const NavLink = React.forwardRef((props, ref) => (
    <Link
      {...props}
      getProps={({ isPartiallyCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        if (isPartiallyCurrent) {
          setTab(props.index);
        }
      }}
    />
  ));

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="center">
          <Grid item>
            <Tabs
              variant="fullWidth"
              classes={{ root: classes.fullHeight }}
              onChange={(_, nextTab) => setTab(nextTab)}
              value={tab}
            >
              {tabs.map(({ label, value, icon, to }) => (
                <Tab
                  key={value}
                  classes={{ root: classes.fullHeight }}
                  label={label}
                  index={value}
                  icon={icon}
                  component={NavLink}
                  to={to}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
