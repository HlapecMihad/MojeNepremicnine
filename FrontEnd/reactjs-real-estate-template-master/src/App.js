import "./App.css";
import FlatDetail from "./components/FlatDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Blog from "./components/Blog";
import About from "./components/About";
import BlogDetail from "./components/BlogDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ComparisonProvider } from "./other/ComparisonContext";
import ComparisonPage from "./components/ComparisonPage";
import { NepremicnineProvider } from "./other/NepremicnineContext";

function App() {
  return (
   <NepremicnineProvider>
    <ComparisonProvider>
      <Router>
        <div className="App">
          <Header />

          <Route path="/" exact component={Home} />
          <Route path="/primerjanje" component={ComparisonPage} />
          <Route path="/about" component={About} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/nepremicnina/:id" component={FlatDetail} />
          <Route path="/filtri" component={Filter} />

          <Footer />
      </div>
    </Router>
    </ComparisonProvider>
    </NepremicnineProvider>
  );
}

export default App;
