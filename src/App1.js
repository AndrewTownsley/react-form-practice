import React, { useState, useReducer } from 'react';
import './App.css';

const formReducer = (state, event) => {
    if(event.reset) {
     return {
       apple: '',
       count: 0,
       name: '',
       'gift-wrap': false,
     }
   }
    return {
      ...state,
      [event.name]: event.value
    }
  }
  function App1() {
  
    const [formData, setFormData] = useReducer(formReducer, { count: 100});
    const [submitting, setSubmitting] = useState(false);
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);

      setTimeout(() => {
        setSubmitting(false);
        setFormData({
            reset: true
        })
      }, 3000)
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
         <fieldset disabled={submitting}>
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
         <fieldset disabled={submitting}>
           <label>
             <p>Apples</p>
             <select 
                name="apple" 
                onChange={handleChange} 
                value={formData.apple || ''}
             >
               <option value=''>--Please choose an option--</option>
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
             <input 
                type="checkbox" 
                name="gift-wrap" 
                onChange={handleChange}
                disabled={formData.apple !== 'Fuji'} 
                value={formData['gift-wrap'] || false} />
           </label>
         </fieldset>
         <button type="submit" disabled={submitting}>Submit</button>
       </form>
      </div>
    );
  }
  

export default App1;