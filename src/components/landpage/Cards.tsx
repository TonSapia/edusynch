import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface Card {
  link: string;
  subtitle: string;
  text: string;
  title: string;
}

interface CardsProps {
  cards: Card[];
  style: string;
}
     
const Cards: React.FC<CardsProps> = ({ cards, style }) => {  
  return (
    <div className={`cards-${style}`}>
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

export default Cards;