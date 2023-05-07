import { Component } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WalletSection from "@/components/dashboard/WalletSection";
import dotenv from 'dotenv';

dotenv.config();

export default class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard">
        <Header navbar={false} login={true} />        
        <WalletSection />
        <Footer />
      </div>      
    )
  }
}
