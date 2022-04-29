import React from "react";
import { useState, useEffect } from "react";
import AddDishModal from '../AddDishModal/AddDishModal'
import './HeroContainer.css'

const HeroContainer = () => {
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
    const getDishes = async () => {
        try{
            const dishes = await fetch("https://lets-dish-express-api.herokuapp.com/dishes")
            const parsedDishes = await dishes.json();
            setDishes(parsedDishes.data)
        } catch (err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getDishes()
     }, [])
    return (
        <section className="main-photo">

            <div>
                <h1 id="App-title" className='App-title'>Let's Dish!</h1>
                    <AddDishModal
                    newDishServerError={newDishServerError}
                    createNewDish={createNewDish}/>
            </div>
        </section>
    )
}
export default HeroContainer;