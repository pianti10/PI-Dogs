import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './components/landing/Landing';
import Home from './components/home/Home' 
import Temperaments from "./components/breeds/Breeds";
import Detail from "./components/detail/Detail";
import  Form from "./components/form/Form"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path= "/temperaments" component={Temperaments} />
          <Route path= "/dogs/:id" component={Detail} />
          <Route exact path= "/breeds" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
