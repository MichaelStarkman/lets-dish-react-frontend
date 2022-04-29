import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavBar'
import DishContainer from './dishContainer/dishContainer';
import HeroContainer from './Components/HeroContainer/HeroContainer';
import QuoteContainer from './Components/QuoteContainer/QuoteContainer';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <HeroContainer />
      <QuoteContainer />
      <DishContainer></DishContainer>
    </div>
  );
}

export default App;
