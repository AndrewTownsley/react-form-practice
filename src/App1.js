import React, { useState, useReducer } from 'react';
import './App.css';

const formReducer = (state, event) => {
    if(event.reset) {
       return {
            apple: '',
            count: '',
            name: '',
            'gift-wrap': '',
        }
    }
    return {
        ...state,
        [event.name]:event.value,
    }
   }
  
  function App1() {
  
    const [formData, setFormData] = useReducer(formReducer, { count: 100});
    const [submitting, setSubmitting] = useState(false);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);
    }
  
    const handleChange = (event) => {
      const isCheckbox = event.target.type === 'checkbox';
      setFormData({
        name: event.target.name,
        value: isCheckbox ? event.target.checked : event.target.value,
      })
    }
  
    return (
      <div className="App">
        <h1>How About Them Apples</h1>
        {submitting && 
        <div>
          You are submitting the following: 
        <ul>
         {Object.entries(formData).map(([name, value]) => 
           <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           )}
        </ul>
        </div>
        }
       <form action="submit" onSubmit={handleSubmit}>
         <fieldset>
            <label>
              <p>Name</p>
              <input 
                type="text" 
                name="name" 
                autoComplete="off" 
                onChange={handleChange} 
                value={formData.name || ''}
              />
            </label>
         </fieldset>
         <fieldset>
           <label>
             <p>Apples</p>
             <select 
                name="apples" 
                onChange={handleChange} 
                id="appleSelect"
                value={formData.apple || ''}
             >
               <option value="Red">Red</option>
               <option value="Green">Green</option>
               <option value="Fuji">Fuji</option>
               <option value="Rome">Rome</option>
             </select>
           </label>
           <label>
             <p>Count</p>
             <input type="number" name="count" min="1" step="1" onChange={handleChange} value={formData.count || ''} />
           </label>
           <label>
             <p>Gift Wrap</p>
             <input type="checkbox" name="gift-wrap" id="giftWrap" onChange={handleChange} value={formData['gift-wrap'] || false} />
           </label>
         </fieldset>
         <button type="submit">Submit</button>
       </form>
      </div>
    );
  }
  

export default App1;