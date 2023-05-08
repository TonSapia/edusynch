import { Component } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WalletSection from "@/components/dashboard/WalletSection";

export default class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard">
        <Header hidden={"dashboard-hidden"} login={true} />        
        <WalletSection />
        <Footer />
      </div>      
    )
  }
}
