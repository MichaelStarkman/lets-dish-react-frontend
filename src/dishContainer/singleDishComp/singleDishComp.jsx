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
        setShowing(false)
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

             <button onClick={()=>{
                 props.deleteDish(props.dish._id)
             }}>Delete Dish</button>
            {
                 showing ?
                 <div id="edit-dish-form">
                 <button onClick={toggleShowing}>Close Post</button>
                 <form onSubmit={submitUpdateDish}>
                     {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                     Dish Name: <input onChange={handleInputChange} type="text" name="dishName" value={updateDish.dishName}/>
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
             <>
             </>
             
        </div>
    )
}
export default SingleDishComp;