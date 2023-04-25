import React from 'react';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom'


export const MenuItems = (
    <React.Fragment>
        <ListItemButton component="a" href="/katas">
            <ListItemIcon >
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Katas' />
        </ListItemButton>
        <ListItemButton component="a" href="/katas/myKatas">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='My katas' />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Users' />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Ranking' />
        </ListItemButton>
    </React.Fragment>
)