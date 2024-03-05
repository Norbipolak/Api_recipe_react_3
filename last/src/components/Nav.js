import { Link, Outlet } from "react-router-dom";
import SelectMenu from "../functions/SelectMenu";

function Nav() {
    return(
        <>
        <nav>
            <ul>
                <li className={SelectMenu("/")}>
                    <Link to="/">Foods</Link>
                </li>
                <li className={SelectMenu("/cart")}>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
        </>
    );
}

export default Nav;

/*
Ebben a navigációs menüben a kezdőlap a foods lesz -> to="/"
a Cart pedig a to="/cart", fontos, hogy ezek a dolgok Link-ekben legyenek, hogy oda vigyen minket 

most átmegyünk az App.js-re és azt módosítjuk egy kicsit, most így néz ki 
->
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<RecipesP/>}/>
            <Route path="/recipe/:id" element={<RecipeP/>}/>
        </Routes>
    </BrowserRouter>
    );  
}

ez lesz belőle, csinálunk egy Route-tot, ami lesz a Nav menü és azokba teszükbe bele az eddieket 
-> 
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Nav/>}>
                <Route index element={<RecipesP/>}/>
                <Route path="/recipe/:id" element={<RecipeP/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    );  
}

és amit még itt a Nav.js-ben nem csináltunk meg, hogy itt a Nav menüben kellene egy Outlet komponens, mert az Outlet komponensbe 
fogjuk betölteni az összes többi komponenst a RecipeP-t meg a RecipesP-t, mindet, amik ugye az eggyes oldalaknak felelnek meg 

változtatás az itteniben Nav.js-ben, hogy beletettük az egész nav-ot egy <></>-be és alá csináltunk egy <Outlet/>-et 
->
    return(
        <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Foods</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
        </>
    );

Megformáztuk ezeket a dolgokat css-ben -> 
nav {
    height: 70px;
    background-color: #73a499;
}

nav ul {
    display: flex;
    justify-content: center;
}

nav li {
    list-style: none;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    hogy horizontálisan és vertikálisan is középen legyenek ezek, de ezt még ugy is meg lehetett volna oldani,
    hogy adunk neki egy ugyanakkora line-height-ot, mint a height, tehát 70px-t
    
}

nav li:hover {
    background-color: #a9f4e3; 
    ha felé megyünk, akkor megváltozik az li-nek a színe
}

nav li:hover a {
    color:black; 
    ha felé megyünk az li-nek, akkor az a-nak(szövegnek) megváltozik a színe, tehát a foods-nak vagy a cart-nak 
}

nav a {
    color: white;
    padding: 15px; hogy eltávolodjanak egymástól
    text-decoration: none; ha le akarjuk szedni róla az aláhúzásokat
}

A felhasználónak azt kéne tudnia, hogy melyik menüponton van 
ehhez csináljuk a selected-menu class-t 

.selected-menu {
    background-color: #8fccbe;
} 

!!!!!!!!!!!!!!!!!!
Honnan tudjuk, hogy az adott menün vagyunk -> 
Azt kellene tudni, hogy mi a location-ünk, tehát const location = useLocation();
console.log(location);
{pathname: '/', search: '', hash: '', state: null, key:'n6tzh2wy'}
    hash: ""
    key: "n6tzh2wy"
    search: ""
    state: null
    [[Prototype]]: Object

Ebben a location objektumban van egy olyanunk, hogy pathname -> azt mondja meg, hogy éppen melyik oldalon vagyunk 
!!!!!!!!!!!!!!!!!!!!!!!!
Ha a location.pathname az egyenlő azzal, hogy /-jel, tehát, hogyha a főoldalon vagyunk, akkor megkapja a selected-menu class-t,
lülönben pedig egy üres string 
-> 
<li className={location.pathname === "/" ? "selected-menu" : ""}
és akkor ha a főoldalon vagyunk, akkor más szinű lesz az li a navigácisó menün
de ezt lehetne úgy csinálni, hogy készítünk egy functions a components mellé, amiben lesz egy SelectMenu.js
és akkor oda belerajuk ezt a useLocation()-t, mert ő is használhatná 
fontos, hogy ott felül, ez be legyen importálva -> import { useLocation } from "react-router-dom";

bekérünk ott egy olyat, hogy path -> 
function SelectMenu(path) 

és ott azt fogjuk returnölni, hogyha a pathname az egyenlő a path-vel, akkor kapja meg a selected-menu class-t ha pedig nem, akkor egy üres string
return location.pathname === path ? "selected-menu" : "";

function SelectMenu(path) {
    const location = useLocation();

    return location.pathname === path ? "selected-menu" : "";
}

és itt már semmi mást nem csinálunk, csak megadjuk neki a SelectMenu-t és a path-ot
->
    <li className={SelectMenu("/")}>
        <Link to="/">Foods</Link>
    </li>
    <li className={SelectMenu("/cart")}>
        <Link to="/cart">Cart</Link>
    </li>
és akkor ezen az oldalon már erre nincsen szükségünk ->
const location = useLocation();
console.log(location);
de viszont fontos, hogy ezek itt importálva legyenek ->
import { Link, Outlet } from "react-router-dom";
import SelectMenu from "../functions/SelectMenu";

meg is van, csak ez a Cart menüpont, még nincsen meg 
erre csinálunk egy CartP.js-t -> átmenni oda 
*/