import React from "react";
import "./App.css"

import OpenAI from "openai";

class App extends React.Component{
  
   

  
  state = {    
    message : "",    
    response : "",
  }

  setMessage = (e) => {
    this.setState({      
      [e.target.name]: e.target.value,      
    });
    
  };
  
  async sendMessage(){

    const client = new OpenAI({
    apiKey : "apikey ",
    dangerouslyAllowBrowser: true,
    baseURL : "https://api.deepseek.com/v1"})
    
    const response = await client.chat.completions.create({
          model:"deepseek-chat",
          messages:[
              {"role": "user", "content":this.state.message}
          ]
    })

    this.setState({
      response: response.choices[0].message.content
    });

  }
  
  render(){
  return (
    <div className='main-container d-flex flex-column align-items-center w-100 gap-5'>
      <header className='text-white w-50 p-3 fs-1 text-center fw-bolder'> Deepseek AI Chat</header>
      <div className='d-flex flex-column  align-items-center gap-3' style={{width:"75%"}}>        
          <textarea
            name="message"
            placeholder="Chat with me..."
            onChange={this.setMessage}
            value={this.state.message}
          />             
        <button onClick={() => this.sendMessage()}  type="button" style={{width:"10%"}} className='align-self-end button btn btn-outline-light'>
          Send
        </button>
      </div>
      <div className='d-flex flex-column  align-items-center gap-2' style={{width:"75%"}}>
        <textarea
          placeholder="I'll respond here"
          disabled
          value={this.state.response}
        />
      </div>
    </div>
  );
}
}

export default App;
