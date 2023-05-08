import React, { useState } from 'react';
import { getSubscribeAPI } from '../../pages/api/usersAPI';

export default function SubscribeSection() {   
  const [loadingResults, setLoadingResults] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); 
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [inputValue, setInputValue] = useState('');  

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    const emailValue = event.target.value;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue); // regex para validar e-mails
    setIsButtonDisabled(!isEmailValid);
  };

  /** Realiza a simulação de uma subscrição */
  const subscribe = async () => {
    setLoadingResults(true);
    setIsInputDisabled(true);
    setIsButtonDisabled(true);
    await getSubscribeAPI();
    setLoadingResults(false); 
    setInputValue('');
    setIsButtonDisabled(false);
    setIsInputDisabled(false);
  }
          
  return(
    <section className='subscribe-section'>         
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
        </div>  
      </div>
      <div className="grid-form">
        <div className="content">
          <form>    
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input disabled={isInputDisabled} type="email" id="email" name="email" value={inputValue} onChange={handleEmailChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address." />
            </div>
           
            <div className="form-group">
              <button disabled={isButtonDisabled} id="submit" onClick={subscribe} type="submit">{loadingResults ? 'Loading...' : 'Subcribe'}</button>
            </div> 
          </form>             
        </div> 
      </div>       
    </section>
  );    
}