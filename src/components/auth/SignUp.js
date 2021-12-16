import { Box, Button, TextField } from '@material-ui/core'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
// import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'

const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const {setAlert} = CryptoState()

    const handleSubmit = async() => {
        // check password length
        if (password.length <= 6 ) {
            setAlert({
                open: true,
                message: "Password is too short",
                type: "error"
            })
            return;
        }
        // check if passwords match
        if (password !== confirmPassword) {
            setAlert({
                open: true,
                message: "Passwords do not match",
                type: "error"
            })
            return;
        }
        try {
            // the createuserwith email and password i a firebase default confiig in a full app you can use the api itself
            const result = await createUserWithEmailAndPassword(auth, email,password);

            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: "success"
            })

            handleClose();
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error"
            })
        }
    }

    return (
        <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
            <TextField variant="outlined" label="Enter Email" type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField variant="outlined" label="Enter Password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField variant="outlined" label="Confirm Password" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button variant='contained' size="large" style={{ backgroundColor: "#EEBC1D"}} onClick={handleSubmit}>Sign Up</Button>
        </Box>
    )
}

export default SignUp;
