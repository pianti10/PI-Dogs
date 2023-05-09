import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home' 
import Detail from "./components/detail/Detail";
import  Form from "./components/form/Form"
import axios from "axios";
axios.defaults.baseURL = 'https://pi-dogs-production-f2db.up.railway.app/' ;
// axios.defaults.baseURL = 'httpp://localhost:3001/' ;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/home" component={Home} /> */}
          <Route path= "/dogs/:id" component={Detail} />
          <Route exact path= "/breeds" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
