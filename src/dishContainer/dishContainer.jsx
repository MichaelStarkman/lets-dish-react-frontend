import { useEffect, useState } from "react";
import SingleDishComp from "./singleDishComp/singleDishComp";
import AddDishModal from "../Components/AddDishModal/AddDishModal";
// import QuoteContainer from "../Components/QuoteContainer/QuoteContainer";
import FooterBar from "../Components/Footer/FooterBar";

import './dishContainer.css'

const DishContainer = () => {
    const [requestError, setRequestError] = useState("")
    const [dishes, setDishes] = useState([])
    const getDishes = async () => {
        try{
            const dishes = await fetch("https://lets-dish-express-api.herokuapp.com/dishes")
            const parsedDishes = await dishes.json();
            setDishes(parsedDishes.data)
        } catch (err){
            console.log(err)
        }
    }
    const deleteDish = async (idToDelete) => {
        try{
            const apiResponse = await fetch(`https://lets-dish-express-api.herokuapp.com/dishes/${idToDelete}`, {
            method: "DELETE"
            })
            const parsedResponse = await apiResponse.json()
            if(parsedResponse.success){
                const newDishes = dishes.filter(dish => dish._id !== idToDelete)
                setDishes(newDishes)
            }else{
                // TODO: handle error message for unsuccessful delete
            }
        } catch (err){
            console.log(err)
            setRequestError(err.message)
            // TODO: handle front-end error, not sure what the would be 
        }
    }
    const [newDishServerError, setNewDishServerError] = useState ("")
    const createNewDish = async (newDish) => {
        const apiResponse = await fetch("https://lets-dish-express-api.herokuapp.com/dishes", {
            method: "POST",
            body: JSON.stringify(newDish),
            headers: {
                "Content-type": "application/json"
            }
        })
        // Parse response from back-end
        const parsedResponse = await apiResponse.json()
        // If the response is success:
        if(parsedResponse.success){
            // Add the new item to the state
            setDishes([parsedResponse.data, ...dishes])
        }
    }
    const updateDish = async (idToUpdate, dishToUpdate) => {
        const apiResponse = await fetch(`https://lets-dish-express-api.herokuapp.com/dishes/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(dishToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();

        if(parsedResponse.success){
            const newDishes = dishes.map(dish => dish._id === idToUpdate ? dishToUpdate : dish)
            setDishes(newDishes)
        }
    }
    
    
    useEffect(()=>{
        getDishes()
     }, [])
    return (
            <div>
                {/* <h1 className='App-title'>Let's Dish!</h1> */}
                <AddDishModal
                newDishServerError={newDishServerError}
                createNewDish={createNewDish}/>
                {/* <QuoteContainer></QuoteContainer> */}
                {dishes.reverse().map((dish)=>{
                    return <SingleDishComp
                    key={dish._id}
                    dish={dish}
                    deleteDish={deleteDish}
                    // handleInputChange={props.handleInputChange}
                    // updateDishFunction={props.updateDishFunction}
                    updateDish={updateDish}
                    ></SingleDishComp>
                })}
                <FooterBar></FooterBar>
            </div>
    )
}

export default DishContainer;