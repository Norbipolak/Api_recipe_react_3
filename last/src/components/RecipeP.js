import { useParams } from "react-router-dom";

function RecipeP() {
    const [recipe, setRecipe] = useState(null);
    const {id} = useParams();
    console.log(id);

const getRecipe = async ()=> {
    const response = await fetch("https://dummyjson.com/recipes/" + id);

    const json = await response.json();
    console.log(json);

    setRecipe(json);

};

useEffect(()=> {
    getRecipe();
}, []);

return(
    <div className="container">
        <Link className="link-icon" to={"/"}>
            <FontawesomeIcon icon="fa-solid-fa-backward-step"/>
        </Link>
        <div className="recipe-page-grid border-rad-md">
            <div className="box">
                <div className="recipe-page-img">
                    <img src={recipe && recipe.image}/>
                </div>
            </div>
            <div className="box p-large">
                <h3>{recipe && recipe.name}</h3>

                <div className="recipe-data-grid">
                    <div className="white-box">
                        <h4>Cuisine</h4>
                        {recipe && recipe.cuisine}
                    </div>

                    <div className="white-box">
                        <h4>Difficulty</h4>
                        {recipe && recipe.difficulty}
                    </div>

                    <div className="white-box">
                        <h4>Calories</h4>
                        {recipe && recipe.caloriesPerServing} kCal
                    </div>

                    <div className="white-box">
                        <h4>Cook time</h4>
                        {recipe && recipe.cookTimeMinutes} m
                    </div>

                    <div className="white-box">
                        <h4>Prepare time minutes</h4>
                        {recipe && recipe.prepTimeMinutes} minutes
                    </div>
                    
                    <div className="white-box">
                        <h4>Meal type</h4>
                        {recipe && recipe.mealType.join(", ")} 
                    </div>

                    <div style={{gridRow:"3/5", GridColumn:"2/3"}} className="white-box">
                        <h4>Ingredients</h4>
                        <ul className="recipe-list">
                            {
                                recipe && recipe.ingredients.map((ing, i)=>
                                <li key={i}>{ing}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="border-rad-sm" style={{gridColumn: "1/3"}}>
                        <h4>Instructions</h4>
                        <ul className="recipe-list">
                            {
                                recipe && recipe.instructions.map((ins, i)=>
                                <li key={i}>{ins}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}



export default RecipeP;