import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeC({ r }) {
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const index = cart.findIndex(rec.id === r.id);

        if(index === -1) {
            cart.push({
                id:r.id,
                name:r.name,
                quantity:quantity,
                price:Math.floor(Math.random()*26)+5
            })
        } else {
            cart[index].quantity += quantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const adjustQuantity = (q)=> {
        if(q < 1 || q >= 10) 
            return;
        /*
            ha ez r-nek lenne egy olyanja, hogy quantity, hony mennnyi van belőle vagy stock akkor lehetne így 
            if(quantity < 1 || quantity >= r.quantity)
            hogy ne tudjunk többet kiválasztani, mint amennyi van raktáron, de itt most nincsen ilyen 
            de random beírjuk, hogy ne lehessen 10-nél több 
        */
       setQuantity(q);
    };

    useEffect(() => {
        if (localStorage.getItem("cart") === null)
            localStorage.setItem("cart", "[]");

        //localStorage.clear();
    }, []);

    return (
        <div className="recipe">
            <div className="title">
                <h4>{r.name}</h4>
            </div>

            <div className="recipe-img">
                <Link to={"/recipes/ + r.id"}>
                    <img src={r.image} />
                </Link>
            </div>



            <div className="recipe-controls">
                <div>
                <FontAwesomeIcon className="icon"
                onClick={addToCart}
                    icon="fa-solid fa-cart-shopping" />
                </div>

                <div style={{display:"flex", justifyContent:"space-evenly", alingItems:"center"}}>
                <FontAwesomeIcon onClick={()=>adjustQuantity(quantity-1)}
                className="minus-icon"
                icon="fa-solid fa-square-minus" />

                <input className="sm-input"
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    type="number" value={quantity} />

                <FontAwesomeIcon onClick={()=>adjustQuantity(quantity+1)}
                className="plus-icon"
                icon="fa-solid fa-square-plus" />
                </div>
            </div>
        </div>
    );
}

export default RecipeC;

/*
Azt szeretnénk elérni, hogy ha valamit beleteszünk a localStorageba, annak van egy id-je is ugye és ha azt a terméket mégegyszer
bele akarjuk rakni a kosárba, tehát localStorage, akkor ne csináljon egy újat, hanem a már meglévőnek növelje a quantity-jét

const index = cart.findIndex(rec=>rec.id === r.id) -> elmagyarazas.js
console.log(index)

a rec az elemek a cartban, aminek az id-jükün végigiterálunk és ha ez az id megegyezik azzal amit fel akarunk vinni, tehát már van
abból az id-jű termékből a kosárba, akkor quantity-t növelünk 

ez az index -1 lesz, ha valami olyasmire kattintunk rá, ami nincs a kosárban 
és ha az index -1, akkor csináljuk a cart.push-os dolgok, szóval ha az az indexű még nincsen benne 
ha nem -1, akkor a cartnak az indexedik elemének a quantity-ját állítjuk be -> cart[index].quantity += quantity;
-> 
if(index === -1) {
    cart.push({
        id:r.id,
        name:r.name,
        quantity:quantity,
        price:Math.floor(Math.random()*26)+5
    })
} else {
    cart[index].quantity += quantity;
}

most így nézki at addToCart függvényünk 
->
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const index = cart.findIndex(rec.id === r.id);

        if(index === -1) {
            cart.push({
                id:r.id,
                name:r.name,
                quantity:quantity,
                price:Math.floor(Math.random()*26)+5
            })
        } else {
            cart[index].quantity += quantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    };

    1.const cart....localStorage-ból lekérjük a cart-ot a getItem-vel, fontos, hogy JSON parse-olni kell, mert ugye a localStorage-n a dolgok JSON stringben 
    vannak fent és nekünk egy tömb kell majd 
    2.const index....itt a cart tömbben megnézzük, hogy az elemeinek(rec)ugye van egy id-jük és ha az egyezik-e az r.id-val 
    az r.id abból jön, hogy egy objektumot akarunk majd push-olni ebbe a cart-tömbbe és ennek az objektumnak az egyik értéke az r.id és 
    ezt hasonlítjuk össze
    3. megnézzük, hogyha az index, amit leírtam annak az eredménye -1 lesz, az azt jelenti, hogy ez a termék, amit hozzá szeretnénk adni 
    ez még nincsen a kosárban tehát a localStorage-unkban ezért a következőféleképpen pusholjuk a carthoz 
        cart.push({
        id:r.id,
        name:r.name,
        quantity:quantity,
        price:Math.floor(Math.random()*26)+5
    ha viszont else tehét az index nem -1 lesz, az azt jelenti, hogy ez a termék már benne van a kosarunkban, localStorage-unkban 
    ezért itt csak az adott terméknek cart[index], a cart tömb indexedik helyén megtalálható terméknek ugye van egy quantity-je a name, id és 
    price mellett, annak a quantity-jét növeljük a quantity-val 
    a quantity pedig innen jön 
        <input className="sm-input"
        onChange={e => setQuantity(parseInt(e.target.value))}
        type="number" value={quantity} />
    amennyi bele van írva az input mezőbe, value-ja

    Azt csináljuk, hogy egy rendes navigációs menüvel ellátjuk majd ezt a dolgot Nav.js

    */