import "./App.css";
import FlatDetail from "./components/FlatDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProdajaPage from "./components/ProdajaPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ComparisonProvider } from "./other/ComparisonContext";
import ComparisonPage from "./components/ComparisonPage";
import Registracija from "./components/Registracija";
import Prijava from "./components/Prijava";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoriteProperties from "./components/FavoriteProperties";
import OddajaPage from "./components/OddajaPage";
import Filter from "./components/Filter";

function App() {
  return (
    <ComparisonProvider>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/primerjanje" component={ComparisonPage} />
            <Route path="/nepremicnina/:id" component={FlatDetail} />
            <Route path="/filtri" component={Filter} />
            <Route path="/registracija" component={Registracija} />
            <Route path="/prijava" component={Prijava} />
            <Route path="/priljubljenje" component={FavoriteProperties} />
            <Route path="/nepremicnine/prodaja" component={ProdajaPage} />
            <Route path="/nepremicnine/oddaja" component={OddajaPage} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </ComparisonProvider>
  );
}

export default App;
