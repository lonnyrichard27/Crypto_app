import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, Toolbar, Typography, ThemeProvider } from '@material-ui/core'
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../CryptoContext'
import AuthModal from './auth/AuthModal'
import UserSideBar from './auth/UserSideBar'

const Header = () => {
    const useStyles = makeStyles(() => ({
        title:{
            flex: 1,
            color: 'gold',
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer"
        }
    }))

    const classes = useStyles()
    const history = useNavigate()

    const { currency, setCurrency, user } = CryptoState()

    console.log(currency);

    const darkTheme = createTheme({
        palette:{
            primary:{
                main: "#fff"
            },
            type: "dark",
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
           <AppBar color="transparent" position="static">
               <Container>
                   <Toolbar>
                       <Typography 
                        className={classes.title} 
                        onClick={() => history("/")}
                        variant="h6"
                        >
                            Crypto Hunter
                        </Typography>
                       <Select
                        variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                       >
                           <MenuItem value={'USD'}>USD</MenuItem>
                           <MenuItem value={'NGN'}>NGN</MenuItem>
                       </Select>
                       {user ? <UserSideBar /> : <AuthModal />}
                   </Toolbar>
               </Container>
            </AppBar> 
        </ThemeProvider>
    )
}

export default Header;
