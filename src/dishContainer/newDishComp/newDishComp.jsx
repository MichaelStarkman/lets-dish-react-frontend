import { useState } from "react";

const NewDishComp = (props) => {
    const [showing, setShowing] = useState(false)
    const [newDish, setNewDish] = useState({
        dishName: "",
        image: "",
        location: "",
        cost: 0,
        category: "" 

    })
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})

    const toggleShowing = () => {
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setNewDish({
            ...newDish,
            [e.target.name]: e.target.value 
        })
    }
    const submitNewDish = (e)=>{
        e.preventDefault()
        let validSubmission = true;

        if(newDish.category.length < 1){
            setIsValidState({
                valid: false,
                message: "But what category is it?"
            })
            validSubmission = false;
        }if(newDish.cost < 1){
            setIsValidState({
                valid: false,
                message: "IT'S FREE?! I don't believe you."
            })
            validSubmission = false;
        }if(newDish.location.length < 1){
            setIsValidState({
                valid: false,
                message: "Restaurant needs a name"
            })
            validSubmission = false;
        }if(newDish.dishName.length < 2){
            setIsValidState({
                valid: false,
                message: "Dish name is not long enough"
            })
            validSubmission = false;
        }
        if(validSubmission){
            props.createNewDish(newDish)
            setNewDish({
                dishName: "",
                image: "",
                location: "",
                cost: 0,
                category: "" 
            })
            setIsValidState({
                valid: true,
                message: ""
            })
            setShowing(false)
        }
    }
    return(
        <>
        {
            showing 
            ?
            <div id="new-dish-form">
                <button onClick={toggleShowing}>Close Post</button>
                <form onSubmit={submitNewDish}>
                    {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                    { props.newDishServerError ? <p className="form-error">{props.newDishServerError}</p> : null}
                    Dish Name: <input onChange={handleInputChange} type="text" name="dishName" value={newDish.dishName}/>
                    <br />
                    {/* Image: <input onChange={handleInputChange} type="file" name="image" value={newDish.image} accept="image/png, image/jpeg"/>
                    <br /> */}
                    Restaurant: <input onChange={handleInputChange} type="text" name="location" value={newDish.location}/>
                    <br />
                    Price: <input onChange={handleInputChange} type="number" name="cost" value={newDish.cost}/>
                    <br />
                    Category: <input onChange={handleInputChange} type="text" name="category" value={newDish.category}/>
                    <br />
                    <button type="submit">Submit Dish!</button>
                </form>

            </div>
            :
            <button onClick={toggleShowing}>Add a dish</button>
        }            
        </>
    )
}
export default NewDishComp;