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
  const [tab, setTab] = useState('dashboard');

  const tabs = [
    {
      label: 'Dashboard',
      value: 'dashboard',
      to: '/',
      icon: <DashboardRounded />,
    },
    {
      label: 'Devices',
      value: 'devices',
      to: '/devices',
      icon: <DevicesOtherRounded />,
    },
    {
      label: 'Settings',
      value: 'settings',
      to: '/settings',
      icon: <SettingsRounded />,
    },
  ];

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
                  value={value}
                  icon={icon}
                  component={Link}
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
