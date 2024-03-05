import RecipeC from "./RecipeC";

function RecipesP() {

    const [recipes, setRecipes] = useState([]);
 
    const getRecipes = async ()=> {
        const response = await fetch("https://dummyjson.com/recipes");
        const json = await response.json() 

        console.log(json);

        
        setRecipes(json.recipes);
    };

    useEffect(()=> {
        setRecipes();
    }, []);


    return(
        <div className="container">
            <div className="recipes-grid">
                {
                    recipes.map((r, i)=> 
                        <RecipeC key={i} r={r}/>
                    )
                }
            </div>

        </div>
    );
}

export default RecipesP;