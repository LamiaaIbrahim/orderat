import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useEffect } from "react";

const AvailableMeals = (props) => {
  const [dummyMeals, setDummyMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMeals() {
      //set loading
      try{
        setIsLoading(true);
        //fetch from firebase
        const response = await fetch(
          "https://foodapp-f2663-default-rtdb.firebaseio.com/meals.json"
        );

        const data = await response.json();

        const loadedMeals = [];

        //loop throw loaded data from firbase
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setDummyMeals(loadedMeals);
        setIsLoading(false);
      }catch(err){
        setError('Something went wrong')
        

      }
    }
    fetchMeals();
    setError('')
  }, []);

  const mealsList = dummyMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
    <Card>{error.length> 0? <Card><p>{error}</p></Card>: <Card>{isLoading ? <p>Loading...</p> : <ul> {mealsList}</ul>}</Card>}</Card>
    </section>
  );
};
export default AvailableMeals;
