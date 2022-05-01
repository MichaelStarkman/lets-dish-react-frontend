import { useEffect, useState } from "react";
import SingleDishComp from "./singleDishComp/singleDishComp";
// import AddDishModal from "../Components/AddDishModal/AddDishModal";
// import QuoteContainer from "../Components/QuoteContainer/QuoteContainer";
import FooterBar from "../Components/Footer/FooterBar";

import './dishContainer.css'

const DishContainer = () => {
    const [requestError, setRequestError] = useState("")
    const [dishes, setDishes] = useState([])
    const [newDishServerError, setNewDishServerError] = useState ("")
    // const createNewDish = async (newDish) => {
    //     console.log(newDish);
    //     console.log("Let's create this")

    //     // const data = new FormData()
    //     // data.append("file", image)
    //     // data.append("upload_preset")
    //     // const uploadImage = await fetch("https://api.cloudinary.com/v1_1/lets-dish-cloudinary/image/upload") 
    //     // Send a request to the our back-end
    //     const apiResponse = await fetch("https://lets-dish-express-api.herokuapp.com/dishes", {
    //         method: "POST",
    //         body: JSON.stringify(newDish),
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //     })
    //     // Parse response from back-end
    //     const parsedResponse = await apiResponse.json()
    //     // If the response is success:
    //     console.log(parsedResponse)
    //     if(parsedResponse.success){
    //         // Add the new item to the state
    //         setDishes([parsedResponse.data, ...dishes])
    //     } else {
    //         setNewDishServerError(parsedResponse.data)
    //         // TODO: refactor state from newDishForm to here, since this is the only place I know whether it worked or not
    //     }
    // }
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
    const getDishes = async () => {
        try{
            const dishes = await fetch("https://lets-dish-express-api.herokuapp.com/dishes")
            const parsedDishes = await dishes.json();
            setDishes(parsedDishes.data)
        } catch (err){
            console.log(err)
        }
    }
    // const handleInputChange = (e) => {
    //     setUpdateDish({
    //         ...updateDish,
    //         [e.target.name]: e.target.value 
    //     })
        // const submitUpdateDish = (e) => {
        //     console.log('hello')
        //     e.preventDefault();
        //     props.updateDish(props.dish._id ,updateDish)
        //     let validSubmission = true;
    
        //     if(updateDish.category.length < 1){
        //         setIsValidState({
        //             valid: false,
        //             message: "But what category is it?"
        //         })
        //         validSubmission = false;
        //     }if(updateDish.cost < 1){
        //         setIsValidState({
        //             valid: false,
        //             message: "IT'S FREE?! I don't believe you."
        //         })
        //         validSubmission = false;
        //     }if(updateDish.location.length < 1){
        //         setIsValidState({
        //             valid: false,
        //             message: "Restaurant needs a name"
        //         })
        //         validSubmission = false;
        //     }if(updateDish.dishName.length < 2){
        //         setIsValidState({
        //             valid: false,
        //             message: "Dish name is not long enough"
        //         })
        //         validSubmission = false;
        //     }
        //     if(validSubmission){
        //         props.updateDish(updateDish)
        //         setUpdateDish({
        //             dishName: "",
        //             location: "",
        //             cost: 0,
        //             category: "" 
        //         })
        //         setIsValidState({
        //             valid: true,
        //             message: ""
        //         })
        //         setShow(false)
        //     }
        // }
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
                {/* <h1 className='App-title'>Let's Dish!</h1>
                <AddDishModal
                newDishServerError={newDishServerError}
                createNewDish={createNewDish}/> */}
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