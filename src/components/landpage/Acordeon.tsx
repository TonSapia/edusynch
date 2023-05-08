import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';

interface AcordeonProps {
  classAcordeon: string;
  label: string;
  name: string;
  crypto: string;
  price: string;
  change: string;
}

function Acordeon({ classAcordeon, label, name, crypto, price, change }: AcordeonProps) {
  return (
    <Accordion className={`acordeon ${classAcordeon}`}>
      <AccordionSummary className="acordeon-summary" expandIcon={<ExpandMoreIcon />}>
        <Chip className="chip-acordeon" icon={(crypto.length > 0) ? <img src={crypto}/> : <img src="assets/images/ETH.svg" />} label={(name) ? name : label} />
      </AccordionSummary>
      <AccordionDetails className="acordeon-details">
        <p>{price}</p>
        <label className={`${(Number(change) >= 0) ? "positive" : "negative"}`}>
          {Number(change) >= 0 ? `+${change}` : change}%
        </label>
      </AccordionDetails>
    </Accordion>
  );
}

export default Acordeon;