import { useState } from "react"

const SingleDishComp = (props) => {
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateDish, setUpdateDish] = useState({
        dishName: props.dish.dishName,
        location: props.dish.location,
        cost: props.dish.cost,
        category: props.dish.category,
        _id: props.dish._id 

    })
    const handleInputChange = (e) => {
        setUpdateDish({
            ...updateDish,
            [e.target.name]: e.target.value 
        })
    }
    const submitUpdateDish = (e) => {
        e.preventDefault();
        props.updateDish(props.dish._id, updateDish)
        let validSubmission = true;

        if(updateDish.category.length < 1){
            setIsValidState({
                valid: false,
                message: "But what category is it?"
            })
            validSubmission = false;
        }if(updateDish.cost < 1){
            setIsValidState({
                valid: false,
                message: "IT'S FREE?! I don't believe you."
            })
            validSubmission = false;
        }if(updateDish.location.length < 1){
            setIsValidState({
                valid: false,
                message: "Restaurant needs a name"
            })
            validSubmission = false;
        }if(updateDish.dishName.length < 2){
            setIsValidState({
                valid: false,
                message: "Dish name is not long enough"
            })
            validSubmission = false;
        }
        if(validSubmission){
            props.updateDish(updateDish)
            setUpdateDish({
                dishName: "",
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
        <div className="index-single-item">
            <h2>
               Dish Name: {props.dish.dishName}
                <br />
              Restaurant:  {props.dish.location}
                <br />
               Price: ${props.dish.cost}
                <br />
               Category: {props.dish.category}
                
            </h2>
            {
                 showing ?
                 <div id="edit-dish-form">
                 <button onClick={toggleShowing}>Close Edit</button>
                 <form onSubmit={submitUpdateDish}>
                     {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                     Dish Name: <input onChange={handleInputChange} type="text" name="dishName" value={updateDish.dishName}/>
                     <br />
                     Image: <input onChange={handleInputChange} type="file" name="image" value={updateDish.image}/>
                     <br />
                     Restaurant: <input onChange={handleInputChange} type="text" name="location" value={updateDish.location}/>
                     <br />
                     Price: <input onChange={handleInputChange} type="number" name="cost" value={updateDish.cost}/>
                     <br />
                     Category: <input onChange={handleInputChange} type="text" name="category" value={updateDish.category}/>
                     <br />
                     <button type="submit">Edit Dish!</button>
                 </form>
                 </div>
                 :
                 <button onClick={toggleShowing}>Edit this dish</button>
            }
            <br />
             <button onClick={()=>{
                 props.deleteDish(props.dish._id)
             }}>Delete Dish</button>
            
             <>
             </>
             
        </div>
    )
}
export default SingleDishComp;