import SideMenu from "@/components/dashboard/SideMenu";
import Wallet from "@/components/dashboard/Wallet";

export default function WalletSection() {      
  
  return (
    <div className="wallet-section">
       <SideMenu />
       <Wallet />
    </div>
  );
}