import React from "react";
import Slider from "react-slick";

interface CurrencyCarouselProps {
  currencies: { 
    asset_id: string, 
    value: number, 
    variation: string,  
    price_usd: number,
    volume_1day_usd: number,
    volume_1hrs_usd: number}[];
}

const CarrouselCoin: React.FC<CurrencyCarouselProps> = ({ currencies }) => {
  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,		      
    cssEase: 'linear',
    speed: 5000,
    infinite: true,
    autoplaySpeed: 0,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <Slider className="carrousel-coin" {...settings}>
      {currencies.map(currency => (
        <div className="currency-item" key={currency.asset_id}>
          <div className="asset-id">
            <b>{currency.asset_id}</b>
          </div>
          <div className="value">
            <b>{currency.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b>
          </div>
          <div className="variation">
            <label className={`${(Number(currency.variation) >= 0) ? "positive" : "negative"}`}>
              <b>{Number(currency.variation) >= 0 ? `+${currency.variation}` : currency.variation}</b>
            </label>
          </div>               
        </div>
      ))}
    </Slider>
  );
};

export default CarrouselCoin;