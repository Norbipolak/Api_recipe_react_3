import './App.css';
import RecipesP from './components/RecipesP';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeC from './components/RecipeC';
import RecipeP from './components/RecipeP';
import Nav from './components/Nav';
import CartP from './components/CartP';

library.add(
  faCartShopping,
  faArrowUpRightFromSquare, 
  faBackWardStep,
  faSquarePlus,
  faSquareMinus
);
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Nav/>}>
                <Route index element={<RecipesP/>}/>
                <Route path="/recipe/:id" element={<RecipeP/>}/>
                <Route path="/cart" element={<CartP/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    );  
}

export default App;