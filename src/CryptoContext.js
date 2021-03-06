import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from './config/api'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("NGN")
    const [symbol, setSymbol] = useState("₦")
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: ""
    })

    useEffect(() => {
        // monitor the auth state changes
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    }, [])

    const fetchCoins = async () => {
        setLoading(true)
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false)
    }

    useEffect(() => {
        if (currency === "NGN") {
            setSymbol("₦")
        } else if (currency === "USD") {
            setSymbol("$")
        }
    }, [currency])  

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user}}>
            {children}
        </Crypto.Provider>
    )
}
 
export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crypto);
};