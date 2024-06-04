import "./App.css";
import FlatDetail from "./components/FlatDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NepremicninePage from "./components/NepremicninePage";
import Filter from "./components/Filter";
import Blog from "./components/Blog";
import About from "./components/About";
import BlogDetail from "./components/BlogDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComparisonProvider } from "./other/ComparisonContext";
import ComparisonPage from "./components/ComparisonPage";
import SearchResult from "./components/SearchResult";
import { NepremicnineProvider } from "./other/NepremicnineContext";
import Registracija from "./components/Registracija";
import Prijava from "./components/Prijava";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoriteProperties from "./components/FavoriteProperties";

function App() {
  return (
    <NepremicnineProvider>
      <ComparisonProvider>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/primerjanje" component={ComparisonPage} />
              <Route path="/about" component={About} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/blog/:id" component={BlogDetail} />
              <Route path="/nepremicnina/:id" component={FlatDetail} />
              <Route path="/filtri" component={Filter} />
              <Route path="/registracija" component={Registracija} />
              <Route path="/prijava" component={Prijava} />
              <Route path="/priljubljenje" component={FavoriteProperties} />
              <Route path="/searchResult" component={SearchResult} />
              <Route path="/nepremicnine" component={NepremicninePage} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ComparisonProvider>
    </NepremicnineProvider>
  );
}

export default App;
