import Cards from "@/components/landpage/Cards";

export default function CardsSection() {      
  return(
    <section className='cards-section'>         
      <div className="grid-cards">
        <Cards />          
      </div>
      <div className="grid-text">
        <div className="content">
          <h3>Lorem ipsum</h3>

          <h2>Lorem ipsum</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit ut aliquam, purus sit 
            amet luctus venenatis, lectus magna 
            fringilla urna, porttitor
          </p>

          <button className="btn btn-pry">
            Sign up now              
          </button>           
        </div>          
      </div>       
    </section>
  );    
}