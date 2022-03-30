import { useState } from "react";

const DishContainer = () => {
    const [dishes, setDishes] = useState([{"_id": "1", "dishName" : "Sausage Pizza", "location" : "Gigio's", "cost" : 3.50, "category": "Italian"}])
    return (
        <div>
            <h2>Dish goes here!</h2>
            {dishes.map((dish)=>{
                return <p key={dish._id}> 
                    
                    {dish.dishName}
                    <br />
                    {dish.location}
                    <br />
                    {dish.cost}
                    <br />
                    {dish.category}
                     </p>
            })}
        </div>
    )
}
export default DishContainer;