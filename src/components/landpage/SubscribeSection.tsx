export default function SubscribeSection() {    
      
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
              <input type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Por favor, insira um endereço de e-mail válido." />
            </div>
           
            <div className="form-group">
              <button type="submit">Entrar</button>
            </div> 
          </form>             
        </div> 
      </div>       
    </section>
  );    
}