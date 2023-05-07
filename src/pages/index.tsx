import { Component } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CardsSection from "@/components/landpage/CardsSection";
import TableSection from "@/components/landpage/TableSection";
import BannerSection from "@/components/landpage/BannerSection";
import SubscribeSection from "@/components/landpage/SubscribeSection";
import dotenv from 'dotenv';

dotenv.config();

export default class Home extends Component {

  render() {
    return (
      <div className="landpage">
        <Header navbar={true} login={false} />
        <BannerSection />
        <CardsSection />
        <TableSection />
        <SubscribeSection />
        <Footer />
      </div>      
    )
  }
}
