function CartP() {
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const cartStr = localStorage.getItem("cart");

        if (cartStr)
            setCart(JSON.parse(cartStr));
    }, []);

    const findIndex = (id) => {
        return cart.findIndex(f => f.id === id);
    };

    const modifyQuantity = (id, amount) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        const f = cTemp[index];
        if (f.quantity <= 1 || amount === -1)
            return;
        f.quantity += amount;

        cTemp.splice(index, 1);
        setCart(c => [...cTemp, f]);
    };

    const delFood = (id) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        cTemp.splice(index, 1);
        setCart(cTemp);
    };

    const sort = (a, b) => {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return +1
        else
            return 0;
    };

    const emptyCart = () => {
        setCart([]);
        localStorage.setItem("cart", "[]");
    };

    useEffect(() => {
        setQuantity(cart.reduce((subTotal, f) => subTotal + f.quantity, 0));
        setPrice(cart.reduce(subTotal, f => subTotal + f.price * f.quantity, 0));

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <div className="container">
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Price*Quantity</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.sort(sort).map((f, i) =>
                            <tr key={i}>
                                <td>{f.name}</td>
                                <td style={{ display: "flex", justifyContent: "space-evenly", alingItems: "center" }}>
                                    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, -1)}
                                        className="minus-icon"
                                        icon="fa-solid fa-square-minus" />

                                    <input className="sm-input" readOnly
                                        type="number" value={f.quantity} />

                                    <FontAwesomeIcon onClick={() => modifyQuantity(f.id, +1)}
                                        className="plus-icon"
                                        icon="fa-solid fa-square-plus" />
                                </td>
                                <td>{f.price}</td>
                                <td>{f.price * f.quantity}</td>
                                <td>
                                    <button onClick={delFood}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>
                        <th>
                            Total
                        </th>
                        <th>
                            {quantity}
                        </th>
                        <th colSpan={2}>
                            {price} $
                        </th>
                        <th>
                            <button onClick={emptyCart}
                            >Empty Cart</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CartP;

/*
Minek kell bent lennie a cart-ban mint adatként 
cartban kell hogy legyen terméknév, mennyiség, price, törlés 

ezt el lehet készíteni grid-ben is meg táblázatban is 
csinálunk egy táblázatot, table kap egy classname="cart-table"-t
<table className="cart-table">
table-nek lesz egy thead-je, abban tr, majd abban a th-k
így néz ki a thead 
->
    <thead>
        <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Price*Quantity</th>
            <th>Delete</th>
        </tr>
    </thead>

és akkor lesz még a tbody is 

de előtte megcsináljuk, hogy itt milyen függvényeket fogunk használni 
lesz egy increase és egy decrease, egyikkel növeljük, másikkal csökkentjük a mennyiséget 
és fontos!!!!!!!!! hogy mindegyiknél meg kell adni paraméterként az id-t, hiszen így tudjuk, hogy melyik terméknek szeretnénk 
megváltoztatni a mennyiségét 
kell még egy függvény a törléshez ez lesz a delFood, amihez szintén szükséges egy id!!!
és akkor még lesz egy, olyan, hogy az egész kosár ürítése, ez lesz az emptyCart
1. increase 2.decrease 3.delFood 4.emptyCart

!!!!!!!!!!!!!
Kell még egy useState-s változó, ami lesz a cart és egy üres tömb lesz az értéke 
->
const [cart, setCart] = useState([]);

és még a következőt csináltuk useEffect-ben 
-> 
    useEffect(()=>   {
        const cartStr = localStorage.getItem("cart");

        if(cartStr)
            setCart(JSON.parse(cartStr));
    }, []);

Tehát getItem-vel a localStorageból megszerezzük a cart-ot 
és akkor if(cartStr), szóval ha létezik ez, lehetett volna úgy nem egyenlő null-val !==null 
akkor set-eljük a cart a cartStr, megint ez JSON.parse-olni kell, mert ez egy JSON string 

Hogyan jelenítjük meg innentől kezdve a dolgokat ->
csináltunk egy tbody-t, amibe kell egy tablerow(tr) és akkor végigmegyünk a cart-on egy map-val és megjelenítjük a dolgokat, 
amikre szükségünk van, de a tr benne kell, hogy legyen a mapban, mert több dolgot szeretnénk megjeleníteni!!!!!!!!!!!
-> 
    <tbody>
        {
            cart.map((f, i)=> 
                <tr key={i}>
                    <td>{f.name}</td>
                    <td>{f.quantity}</td>
                    <td>{f.price}</td>
                    <td>{f.price * f.quantity}</td>
                    <td><button>Delete</button></td>
                </tr>
            )
        }
    </tbody>
és a tr fogja megkapni a key={i} unique key property-t!!!!!!!!!!!!!!!!
és nagyon fontos, hogy a App.js-en csinálink egy route-ot a cart-nak!!!! -> <Route path="/cart" element={<CartP/>}/>
ez egész így néz ki, az összes route ->
    <Routes>
        <Route path='/' element={<Nav/>}>
            <Route index element={<RecipesP/>}/>
            <Route path="/recipe/:id" element={<RecipeP/>}/>
            <Route path="/cart" element={<CartP/>}/>
        </Route>
    </Routes>

most már müködőképes ez az oldal is, de még meg kell formázmni css-ben a .cart-table-t
.cart-table {
    border: 1px solid #d0d0d0;
    text-align: center;
    border-collapse: collapse;
    mert most ennek is van egy border-je, meg a td, th-knak is van egy border-je ezért duplikálodnak, collapse-vel pedig nem
    width: 100%;hogy szélesebb legyen
}

.cart-table td, .cart-table th {
    border: 1px solid #d0d0d0;
    padding: 5px;
}

Azt is meg lehet csinálni, hogy a thead az legyen valamilyen más színű 
.cart-table thead {
    background-color: #e28b00;
    color:white;
}

minden második sor a tbody belüli tr-nak más háttérszínt fog kapni 
.cart-table tbody tr:nth-child(2n) {
    background-color: #3a3a3a;
}

és akkor meg van a táblázatunk
ami még kell, hogy a quantity-nál legyen egy plus meg egy minus gomb, hogy lehessen itt is változtatni a quantity-t
a RecipeC-n van egy plus meg egy minus, azt fogjuk átmásolni ide 
    <td style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}>
        <FontAwesomeIcon 
        className="minus-icon"
        icon="fa-solid fa-square-minus" />

        <input className="sm-input" readOnly
        type="number" value={f.quantity} />

        <FontAwesomeIcon 
        className="plus-icon"
        icon="fa-solid fa-square-plus" />
    </td>
kicsit átalakítottuk, mert itt nem lesz onClick meg ilyesmi, 
csak az ikonok meg az input mező 
!!!!fontos, hogy az input mező value-ja az f.quantity legyen -> value={f.quantity}

ugye a recipeC-n is a div amiben volt az egész kapta meg a ->style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}
és itt is td-nek meg kell kapnia a ugyanezt, hogy ne legyenek, annyira közel az ikonok az input mezőhöz 

!!!!!!!!!
és akkor ezekre az ikonokra kell az increase meg a decrease függvényt implementálni 
az ugy fog megtörténni, hogy ki kellene keresni az index-et a termék id alapján 
a termék id-t meg onnan tudjuk, hogy ez meg volt a food objektumokban
-> 
const index = cart.findIndex();
Ez ugye egy bizonyos tulajdonságú elemnek az indexét keresi meg 
const index = cart.findIndex(f=>f.id === id);
és ez az egész olyan gyakran fog előfordulni, ugye az increase, decrease és a delFoodban is, hogy csinálunk neki egy függvényt ->findIndex

    const findIndex = (id)=> {
        return cart.findIndex(f=>f.id === id);
    };

és akkor a increase-ben használjuk is 
ott a const index = findIndex(id);
és akkor a cart indexedig elemének a quantity-ját fogjuk növelni eggyel -> cart[index].quantity++;
ez csak a lokális változó ez a cart -> const [cart, setCart] = useState([]);
ezért kell még a localStorage.setItem(JSON.stringify(cart))
->
    const increase = (id) => {
        const index = findIndex(id);
        cart[index].quantity++;
        
        localStorage.setItem("cart", JSON.stringify(cart));
    };
a setItem-nél kell egy kulcs, ez lesz a "cart" és kell egy érték, ez lesz a JSON.stringify(cart)
Ebben a az increase függvényben, ami vár egy id-t 
1. létrehoztunk egy változót, aminek megadtuk a findIndex függvényt (id)-val 
2. cart[index].quantity++
    ezt fogja csinálni ez a függvény, ugye az index, amit létrehoztunk az elöbb az a findindex segítségével, ami az id alapján 
    megtalálja azt az elemet, amire nekünk szükségünk van, annak a quantity-ját növeli majd eggyel 
3. a változás az még csak a cart lokális változóban történik, de ahhoz, hogy a localStorage-ben is bekövetkezzen ez a változás, 
ahhoz setItem-enelni méghozzá a cart-ot, tehát mostmár a változást ádadtuk és ott is meg fog jelenni, tehát mi a lokális változót 
módosítjuk de aztán közvetlenül felülírjuk az új értékkel 

a decrease az teljesen ugyanez, annyi különbséggel, hogy itt a quantity az -- lesz
meg azzal a különbséggel, hogyha a cart[index].quantity az kisebb vagy egyenlő, mint egy akkor returnölünk 
tehát ne tudjuk a cart-ban megvásárolni valamit, aminek a quantity-je az nulla 
    if(cart[index].quantity <= 1)
        return
->
    const decrease = (id) => {
        const index = findIndex(id);
        if(cart[index].quantity <= 1)
            return;

        cart[index].quantity--;
        
        localStorage.setItem("cart", JSON.stringify(cart)); 
    };

de ez mégse lesz ilyen egyszerű 
ez a megoldás kell 
    const increase = (id) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        const f = cTemp[index];
        f.quantity++;

        cTemp.splice(index, 1);
        setCart(c=>[...cTemp, f]);
    };
Mi történik itt ->
cosnt cTemp = [...cart] -> lemásolom a cart-nak az elemeit 
const f = cTemp[index] -> az aktuális foodunk az a cTemp-nek az indexedik eleme, kiszedjük a f-et az index alapján 
f.quantity++ -> ennek a quantity-ját növeljük eggyel 

utána a temporary-ból kitöröljük az indexedik elemet 
cTemp.splice([index, 1])
majd set-eljük az új értékkel a cart-ot
setCart(c=>[...c, f])
elmagyarazas.js  

és akkor a localStorage-t sem itt csináljuk, hanem csinálunk rá egy useEffectet, mármint a cart-ra, a cartnak a változására 
Ha módosul a cart, akkor azt észre fogja nekünk venni ez a useEffect és onnantól kezdve frissíti az értékét 

De lehet úgy is, hogy nem lenne külön decrease, increase, hanem csak egy modifyQuantity függvény, ami majd kér egy id-t és egy amountot 
és akkor annyiban fog változni, hogy a quantity az nem quantity++ vagy -- hanem f.quantity += amount másképpen f.quantity = f.quantity + amount
az amount majd lehet -1 is és mivel majdnem teljesen ugyanaz a kettő, az egyiknél +1 lesz a másiknál -1
el a végleges megoldás egy függvényben -> 
    const modifyQuantity = (id, amount) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        const f = cTemp[index];
        if(f.quantity <= 1 || amount === -1)
            return;
        f.quantity += amount;

        cTemp.splice(index, 1);
        setCart(c=>[...cTemp, f]);
    };

fontos, hogy a if-ben ne csak az legyen, hogy f.quantity <= 1 hanem kell még hozzá az amount === -1
mert, ha az nem lenne, akkor növelni sem fogja 
majd azt is meg lehet csinálni, hogyha az amount az 0, akkor delete-je az egészet

és akkor ezt még meg kell adni a FontAwesome-os ikonos dolognak, ugye minus-osnak, úgy, hogy -1 a plus ikonnak meg +1-vel
onClick={()=>modifyQuantity(f.id, -1)}
meg is adtuk neki onClick-vel és azért kell, ilyen formában, tehát ez nem lenne jó így -> onClick={modifyQuantity(f.id, -1)}
mert, nem akkor történne a változás, amikor rákattintunk erre az ikonra, hanem, akkor amikor betöltödik a komponens!!!!
ezért kell ez a arrow function-ös valami 
ugye a másik pedig +1-vel lesz az onClick-je
-> 
    <FontAwesomeIcon onClick={()=>modifyQuantity(f.id, +1)}
    className="plus-icon"
    icon="fa-solid fa-square-plus" />
Fontos, ugye, hogy meg legyen neki adva az f.id!!!!!!!!!!!!!!!!!!!!!!!!
*************************************************************************************************************************************
delFood-nak a kidolgozása 
    const delFood = (id) => {
        const index = findIndex(id);
        const cTemp = [...cart];
        cTemp.splice(index, 1);
        setCart(cTemp);
    };
a const index azt ugyanugy kapjuk meg mint az eddigeknél, ami ebből jön 
-> 
cart.findIndex(f=>f.id === id)
cart: Ebben az esetben egy olyan tömbre utal, amely objektumokat tartalmaz, mindegyiknek van egy id tulajdonsága.

findIndex: Ez egy JavaScript tömb metódus, amely visszaadja a tömb első olyan elemének az indexét, 
amely kielégíti a megadott tesztelési függvényt.

(f) => f.id === id: Ellenőrzi, hogy az aktuális elem (f) id tulajdonsága megegyezik-e a megadott id értékkel.

Többi meg az, hogy csinálunk egy másolatot az eredeti tömbből ó, abból a splice segítségével kitöröljük az index-edik elemét,
amit ugye az id segítségével megtaláltunk, hogy melyik elemről van szó
és akkor a cart-ot setteljük a cTemp-vel, amiben ugye splice-val kitöröltük, tehát nincs benne ez az elem

és akkor ez a delFood függvény megy majd a delete button-ra, amit csináltunk egy onClick-vel 
-> 
    <td>
        <button onClick={delFood}
        >Delete</button>
    </td>

most már teljesen kész van a főoldalon kiválasztunk x darabot, x termékből 
utána felül az oldalon van a cart link, amire rámegyünk akkor átvisz minket erre az oldalra, itt tudjuk változtatni ugye a 
mennyiséget a modifyQuantity függvény segítségével és még a delFood segítségével ki is tudjuk törölni 
****************************************************************************************************************************************
van egy olyan probléma, hogy ha megnöveljük vagy csökkentjük valamelyiknek a mennyiségét, akkor összevissza ugranak a dolgok 
a termékek, ezért name alapján szeretnénk renddezni őket 
csináltunk egy sort függvényt 
-> 
    const sort = (a, b)=> {
        if(a.name < b.name)
            return -1;
        else if(a.name > b.name)
            return +1
        else
            return 0;
    };

és, akkor a map-nél, ahol végigmegyünk a dolgokon, ott azt szeretnénk, hogy name alapján abc sorrendbe menjen és jelenítse meg őket 
csak annyi, hogy a cart.map elé még oda kell rakni a sort()-ot, aminek megadjuk a sort függvényt sort(sort)
-> 
cart.sort(sort).map((f, i) =>
és akkor, így már abc sorrendben jellennek meg a dolgok a cartban és ha változtatjuk a quantity-t, akkor sem fog ugrándozni 
de, akkor teljesen hasonló módon tudnánk a price alapján is rendezni a dolgokat 
és akkor meg lehet csinálni azt is hogyha name-re kattintunk rá, akkor a name(felül, ami a headben van) alapján rendezi sorba a dolgokat 
ha pedig a price-ra, akkor pedig az alapján 
**************************************************************************************************************************************
emptyCart 
még kell csinálni egy olyat, hogy alul összegezze a dolgokat 
a quantity-t meg a price * quantity, mert az lesz ugye a végösszegünk éd majd ide fog kerülni az a button, ami majd teljesen kíűríti 
a kosarunkat, annak fogjuk megadni ezt az emptyCart függvényt  
alul csináluk egy tr-t amikben lesznek th-k gondolom a css-es formázás miatt lesz th nem td 

hogy megkapjuk a quantity-t 
ahhoz kell csinálnunk egy quantity useState-s változót -> const [quantity, setQuantity] = useState(0);
és akkor ezt a quantity-t a useEffect-ben fogjuk majd settelni
setQuantity(cart.reduce((subTotal, f)=>subTotal + f.quantity, 0))

és ugyanígy, mint a quantity-nél a price-ra is csinálunk egy useState-s változót -> const [price, setPrice] = useState(0)
ugyanilyen formában, mint elöbb a quantity-t megcsináljuk a setPrice-ot is 
setPrice(cart.reduce(subTotal, f=>subTotal + f.price * f.quantity, 0))
!!!!!!!!fontos, hogy az f.quantity-vel is meg legyen szorozva a f.price
így fog kinézni a jsx ->
    <th>
        Total
    </th>
    <th>
        {quantity}
    </th>
    <th colSpan={2}>
        {price} $
    </th>
    <th>
        <button onClick={emptyCart}
        >Empty Cart</button>
    </th>
így meg az emptyCart függvényünk -> 
    const emptyCart = () => {
        setCart([]);
        localStorage.setItem("cart", "[]");
    };
Fontos, hogy a setCart-val ki legyen űrítve a lokális változó is meg a localStorage is azzal, hogy egy üres lesz az értéke 
******************************************************************************************************************************
Fontos, hogy a setQuantity meg a setPrice is a cart változására készített useEffectben legyen 
hiszen ha a cart változik, akkor ezek az értékek is változni fognak 
*/