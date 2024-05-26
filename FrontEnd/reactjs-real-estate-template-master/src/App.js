import './App.css';
import FlatDetail from "./components/FlatDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [nepremicnine, setNepremicnine] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/nepremicnine')
      .then(response => {
        setNepremicnine(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the nepremicnine!", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
        <Route path="/flat/:slug" component={FlatDetail} />

        <div>
          <h1>Nepremicnine</h1>
          <ul>
            {nepremicnine.map(nepremicnina => (
              <li key={nepremicnina.id}>
                <h2>{nepremicnina.naziv}</h2>
                <p>{nepremicnina.lokacija}</p>
                <p>{nepremicnina.cena} EUR</p>
                <p>{nepremicnina.opis}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
