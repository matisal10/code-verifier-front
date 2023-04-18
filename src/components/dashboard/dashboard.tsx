import React, { useState } from "react";

import { styled, createTheme, ThemeProvider, CssBaseline, Box, Toolbar, List, Divider, Container, Grid, Paper, Typography } from '@mui/material';
import muiDrawer from '@mui/material/Drawer';


import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"

import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import MenuIcon from "@mui/icons-material/Menu"
import CrevronLeftIcon from "@mui/icons-material/ChevronLeft"
import LogoutIcon from '@mui/icons-material/Logout';
import NoticationsIcon from '@mui/icons-material/Notifications'

import { menuItems } from "./menuItems";

const drawerWith: number = 240

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => (
    {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            marginLeft: drawerWith,
            width: `calc(100% -${drawerWith}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
        )
    }
))

const Drawer = styled(muiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })
    (
        ({ theme, open }) => ({
            '& .Drawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWith,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflow: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                    }),
                    width: theme.spacing(7),
                    //breackpoints to media queries of css in differents dysplay sizes 
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9)
                    }
                })
            }
        })
    )

const myTheme = createTheme()

export const Dashboard = () => {

    const [open, setOpen] = useState<any>(true)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <ThemeProvider theme={myTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge='start'
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {
                                    display: 'none'
                                })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component='h1'
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            Code verification katas
                        </Typography>
                        <IconButton color="inherit">
                            <Badge
                                badgeContent={10}
                                color="secondary"
                            >
                                <NoticationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1]
                        }}
                    >
                        <IconButton color="inherit" onClick={toggleDrawer}>
                            <CrevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component='nav' >
                        {menuItems}
                    </List>
                </Drawer>
                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth='lg' sx={{ mt: 4, mg: 4 }}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240
                            }}>

                            </Paper>
                        </Grid>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )

}

