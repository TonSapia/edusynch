import Cards from "@/components/landpage/Cards";

export default function CardsSection() {    
  const cards = [
    { "link": "assets/images/B.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/U.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/V.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/C.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," }
  ];

  return(
    <section className='cards-section'>         
      <div className="grid-cards">
        <Cards cards={cards.slice(0, 2)} style="top" />     
        <Cards cards={cards.slice(2, 4)} style="down" />       
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