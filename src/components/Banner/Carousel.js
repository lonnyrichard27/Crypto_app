import React, { useState, useEffect } from 'react'
import { TrendingCoins } from '../../config/api'
import { CryptoState } from '../../CryptoContext'
import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import {Link} from "react-router-dom"
import { numberWithCommas } from "../CoinsTable";

const Carousel = () => {
  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
    }));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const classes = useStyles();
  const [trending, setTrending] = useState([])

  //   crypto state is the 
  const { currency, symbol } = CryptoState()

  const fetchTrendingCoin = async() => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  }
     
  useEffect(() => {
    fetchTrendingCoin();
    // fetch the data anytime the currency changes thats why we have currency in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  console.log(trending);

  const items = trending.map((coin) => {
    // if it is greater than 0 then its a profit
    let profit = coin.price_change_percentage_24h >= 0

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img 
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {/* the question mark signifies that if it is undefined */}
          {coin?.symbol}
          &nbsp;
          {/* so if it is profit display + to two decimal places */}
          <span style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
          </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}> {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} </span>
      </Link>
    )
  })
        
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  )
}

export default Carousel;
