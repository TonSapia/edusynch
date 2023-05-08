import React from "react";
import Tags from "@/components/landpage/Tags";
import Modal from '@/components/shared/Modal';
import CarrouselBanner from "@/components/landpage/CarrouselBanner";

export default function BannerSection() {    
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const bannerImages = [
    'assets/images/Group 10.svg',
    'assets/images/Group 11.svg',
    'assets/images/Group 12.svg',
  ];

  return(
    <section className='banner-section'>
      <div className="grid-text">
        <div className="content">
          <h1>Lorem ipsum dolor sit amet, consectetur</h1>

          <h4>
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit ut aliquam, purus sit amet 
            luctus venenatis, lectus magna fringilla urna, porttitor
          </h4>

          <button className="btn btn-pry" onClick={handleModalOpen}>
            SIGN UP NOW
            <img src="assets/images/right-arrow.png" /> 
          </button>

          <Tags></Tags>
        </div>          
      </div>  
      <div className="grid-image">
        <CarrouselBanner slides={bannerImages} />          
      </div>
      <div className="grid-waves">
        <img src="assets/images/Waves.svg" />           
      </div>   
      
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title="Modal Title"
        message="Modal Message"
        primaryButtonText="OK"
        primaryButtonAction={"/dashboard"}
        secondaryButtonText="Cancel"
        secondaryButtonAction={handleModalClose}
        type={'register'}
      />    
    </section>
  );
   
}