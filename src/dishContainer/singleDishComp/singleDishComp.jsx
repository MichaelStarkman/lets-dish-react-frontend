import { useState } from "react"
import { 
    Button,
    Form,
    FormGroup,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'react-bootstrap';

const SingleDishComp = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showing, setShowing] = useState(false)
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateDish, setUpdateDish] = useState({
        dishName: props.dish.dishName,
        location: props.dish.location,
        cost: props.dish.cost,
        category: props.dish.category,
        _id: props.dish._id 
    });

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
            setShow(false)
        }
    }
    const deleteButton = () => {
        props.deleteDish(props.dish._id)
        handleClose();
    }
    return(
        <>
        <div>
            <h2>
               Dish Name: {props.dish.dishName}
                <br />
              Restaurant:  {props.dish.location}
                <br />
               Price: ${props.dish.cost}
                <br />
               Category: {props.dish.category}
                
            </h2>
        </div>
        <div>
          <Button 
          variant="primary"
          onClick={handleShow}
          >Edit Dish!
          </Button>
          
          <Modal 
          show={show}
          onHide={handleClose}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          >
          
            <ModalHeader closeButton>
              <Modal.Title>Alright, Let's Dish!</Modal.Title>
            </ModalHeader>
            <FormGroup>
                <Form onClick={submitUpdateDish}>
                {/* {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>} */}
                {/* { props.newDishServerError ? <p className="form-error">{props.newDishServerError}</p> : null} */}
                 <ModalBody>
  
                        {/* {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>} */}
                        {/* { props.newDishServerError ? <p className="form-error">{props.newDishServerError}</p> : null} */}
                        Dish Name: <input onChange={handleInputChange} type="text" name="dishName" placeholder={updateDish.dishName}/>
                        <br />
                        Restaurant: <input onChange={handleInputChange} type="text" name="location" placeholder={updateDish.location}/>
                        <br />
                        Price: <input onChange={handleInputChange} type="number" name="cost" placeholder={updateDish.cost}/>
                        <br />
                        Category: <input onChange={handleInputChange} type="text" name="category" placeholder={updateDish.category}/>
                        <br />
                </ModalBody>
                <ModalFooter>
                  <Button type='click'>Edit Dish</Button>
                < Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
              </ModalFooter>
              </Form>
            </FormGroup>
          </Modal>
          <br />
          <Button 
          variant="danger"
          onClick={deleteButton}
          >Delete Dish</Button>
        </div>
      </>  
    )
}

export default SingleDishComp;