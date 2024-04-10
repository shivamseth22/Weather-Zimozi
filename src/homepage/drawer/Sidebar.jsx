import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';

import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { toggleDrawer } from '../../Redux/drawerSlice'; // Import the toggleDrawer action creator
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Sidebar = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(state => state.drawer.isOpen);
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const navigate = useNavigate();

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer(!isDrawerOpen));
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="default"
            aria-label="menu"
            onClick={handleToggleDrawer}
            position={'sticky'}
          >
            <MenuIcon color="black" />
          </IconButton>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton color="default">
            <LoginIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleToggleDrawer}
        PaperProps={{
          sx: { width: '250px' },
        }}
      >
        <div>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate('/');
                handleToggleDrawer();
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('Dashboard')} /> {/* Translate text */}
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate('/map');
                handleToggleDrawer();
              }}
            >
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={t('Map')} /> {/* Translate text */}
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate('/');
                handleToggleDrawer();
              }}
            >
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={t('Saved Location')} /> {/* Translate text */}
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate('/calender');
                handleToggleDrawer();
              }}
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={t('Calendar')} /> {/* Translate text */}
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate('/setting');
                handleToggleDrawer();
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('Settings')} /> {/* Translate text */}
            </ListItem>
          </List>
        </div>
        <List sx={{ marginTop: 'auto' }}>
          <ListItem
            button
            onClick={() => { localStorage.removeItem('token')
              navigate('/');
              handleToggleDrawer();

            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t('Logout')} /> {/* Translate text */}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
