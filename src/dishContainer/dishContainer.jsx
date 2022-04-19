import { useEffect, useState } from "react";
import SingleDishComp from "./singleDishComp/singleDishComp";
import NewDishComp from "./newDishComp/newDishComp";

const DishContainer = () => {
    const [requestError, setRequestError] = useState("")
    const [dishes, setDishes] = useState([])
    const [newDishServerError, setNewDishServerError] = useState ("")
    const createNewDish = async (newDish) => {
        console.log(newDish);
        console.log("Let's create this")

        // const data = new FormData()
        // data.append("file", image)
        // data.append("upload_preset")
        // const uploadImage = await fetch("https://api.cloudinary.com/v1_1/lets-dish-cloudinary/image/upload") 
        // Send a request to the our back-end
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
        console.log(parsedResponse)
        if(parsedResponse.success){
            // Add the new item to the state
            setDishes([parsedResponse.data, ...dishes])
        } else {
            setNewDishServerError(parsedResponse.data)
            // TODO: refactor state from newDishForm to here, since this is the only place I know whether it worked or not
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
        console.log("delete dish ID " + idToDelete)
    }
    const getDishes = async () => {
        try{
            const dishes = await fetch("https://lets-dish-express-api.herokuapp.com/dishes")
            const parsedDishes = await dishes.json();
            setDishes(parsedDishes.data)
        } catch (err){
            console.log(err)
        }
    }
    const updateDish = async (idToUpdate, dishToUpdate) => {
        // const newDishes = [];
        // for(let i = 0; i < dishes.length; i++){
        //     if(dishes[i]._id === idToUpdate){
        //         newDishes.push(itemToUpdate)
        //     }else {
        //         newDishes.push(dishes[i])
        //     }
        // }
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
        } else {
            setRequestError(parsedResponse.data) 
        }
    }
    useEffect(()=>{
        getDishes()
     }, [])
    return (
        <div>
            <h2>Start dishin''</h2>
            <NewDishComp
            newDishServerError={newDishServerError}
            createNewDish={createNewDish}
            ></NewDishComp>
            {dishes.reverse().map((dish)=>{
                return <SingleDishComp
                key={dish._id}
                dish={dish}
                deleteDish={deleteDish}
                updateDish={updateDish}
                ></SingleDishComp>
            })}
        </div>
    )
}
export default DishContainer;