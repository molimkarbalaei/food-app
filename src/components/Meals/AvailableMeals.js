import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    //1- fetch returns a promise because sending http request is an async task
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-eda8d-default-rtdb.firebaseio.com/meals.json"
        // "https://react-http-e5163-default-rtdb.firebaseio.com/meals.json"
      );
      // try and catch are aychronous tasks, so it returns promises:
      // now if we throw an error inside of a promise that error will cause that promis to reject.
      // if we don't throw an error inside of a promise that promise will resolve.
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      // now we can utilize the data and responseData is an object but we want array:

      const loadedMeals = [];
      // for for getting the keys of the responseData object:
      /// keys are the mealIds:
      // push a new meal object to loadedMeals array(empty array)):
      for (const key in responseData) {
        loadedMeals.push({
          // ...responseData[key],
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      // after we have loaded the meals, we can set the meals state:
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // try { we Add catch to handle the error:
    // we try to fetch the meals if there is no error:
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    }); // fetchmeals is a function of useEffect
    // } catch (error) {
    //   // if we have an error, we set the error state with catch:

    // }
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  //==> we don't have any depencies so it means it will run only in the first render.

  //map all this meals by passing a function to map which executed for every meal by jscript
  //then for every meal, return JSX element that reperesents this meal item.
  const mealsList = meals.map((meal) => (
    // <li>{meal.name}</li> //map them to a meal item insted of list item.
    <MealItem
      id={meal.id} //new
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;

///1- we fetch the data from the server and we get the data in the form of json.

//2- now we need to expose the fecched data to the our component.

// ** asynchroneous task: that only starts after the component loaded for the first time.
//====>>>
// pas avash hich datai nadarim. sooo we need to use useState hook.

//////////////////////////// order button://////////////////////////////
// { expand this model and also show a form where user add address and name...
// after confirm that input and send to the backend. } ::::

//  ===> first step: add the form and the validation.
