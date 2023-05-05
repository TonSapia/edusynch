import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Cards() {      
  const cards = [
    { "link": "assets/images/B.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/U.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/V.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," },
    { "link": "assets/images/C.svg", "title": "Crypto Solutions", "subtitle": "For your company", "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam," }
  ];

  return (
    <div className="cards">
      {cards.map((card, index) => (
        <Card key={index} className={`card card${index}`} sx={{ minWidth: 275 }}>
          <CardContent className="card-content">
            <img src={card.link} alt="" />
            <p>{card.subtitle}</p>
            <h4>{card.title}</h4>
            <p>{card.text}</p>
          </CardContent>        
        </Card>   
      ))}     
    </div>
  );
}