import React, { useContext } from 'react'
import Head from 'next/head'
import NextLink from "next/link"
import { AppBar, Container, Link, Toolbar, Typography, createTheme, CssBaseline ,ThemeProvider, Switch} from '@material-ui/core'
import useStyles from '../../utils/styles'
import { Store, StoreProvider } from '../../utils/Store'
import Cookies from 'js-cookie';
export default function Layout({title,children,description}) {
    
    const {state,dispatch}=useContext(Store)
    const darkMode = state
    console.log(darkMode);

    const theme = createTheme({
        typography: {
          h1: {
            fontSize: '1.6rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
          h2: {
            fontSize: '1.4rem',
            fontWeight: 400,
            margin: '1rem 0',
          },
        },
        palette: {
          type: darkMode==true ? 'dark' : 'light',
          primary: {
            main: '#f0c000',
          },
          secondary: {
            main: '#208080',
          },
        },
      });
    const classes = useStyles();
    const darkModeChangeHandler =()=>{
        dispatch({type:"DARK_MODE_TOG"})
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    }
    return (
        <div>
            <Head>
                <title>{title?`${title} - Next Amazona`:'Next Amazona'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <NextLink href="/" passHref>
                        <Link>
                        <Typography className={classes.brand}>amazona</Typography>
                        </Link>
                    </NextLink>
                    <div className={classes.grow}></div>
                    <div>
                        <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                        <NextLink href="/cart" passHref>
                        <Link>
                            Cart
                        </Link>
                        </NextLink>
                        <NextLink href="/login" passHref>
                        <Link>
                            Login
                        </Link>
                        </NextLink>
                    </div>
                </Toolbar>
            </AppBar>
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <Typography>
                    all rights reserve. Amazona
                </Typography>
            </footer>
            </ThemeProvider>
        </div>
    )
}