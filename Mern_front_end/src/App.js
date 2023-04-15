//import logo from './logo.svg';
import './App.css';
//import axios from 'axios';
import React from 'react';
import { useState } from 'react';

function App() {

  const [files, setfile] = useState()
  const [res, setRes] = useState()
  const [loading, setLoading] = useState(false)
  function handlechange (event)  {
    setfile(event.target.files)
  }
  function checkthefiles(){
    setLoading(true)
    checkthefile()
    setRes(null)
  }

  function checkthefile (){
    const formData = new FormData();
     if(files){
      formData.append('profile', files[0])
    //  if(extension !== 'xlsx') 
    //  {
    // alert('Please select excel files only')
    //  } else {
      //api call
    fetch('http://localhost:2023/upload', {
      method: 'POST',
      body: formData
    }).then(res=>res.json()).then(data=>{
      setRes(data)
      setLoading(false)
    }).catch(err=>console.log(err))
   }}
  //}
  return (
    <div className="App">
    <div className="header">
        <h1>MERN Stack Applicatoion</h1>
    </div>
    <h1 className='upload'>Upload Your File Here !!!</h1>
    <div className='inner'>
    <input className="display" type="file" onChange={handlechange} name="profile" id="fileToUpload"/>
    <label className="labels" for="fileToUpload">Upload file</label>
    <div className='hidden'>{files ? files[0].name : null}</div>
    </div>
    <input className = 'button' type="submit" onClick={checkthefiles} value="Submit" name="submit"></input>
    {res ? res.response ? <h3 className='result'>{res.message}</h3> : 
    <h3 className='fail'>{res.message}</h3>: null}
    {loading ? <h3>Loading....</h3> : null}
  </div>
  );
}

export default App;
