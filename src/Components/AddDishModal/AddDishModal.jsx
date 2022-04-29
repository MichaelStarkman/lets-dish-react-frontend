import React from 'react';
import { useState } from "react";
import { 
    Button,
    Form,
    FormGroup,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'react-bootstrap';
import './AddDishModal.css'


const AddDishModal = (props) => {
  console.log(props)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newDish, setNewDish] = useState({
      dishName: "",
      image: "",
      location: "",
      cost: 0,
      category: "" 

  })
  const [isValidState, setIsValidState] = useState({valid: true, message: ""})

  // const toggleShow = () => {
  //     setShow(!show)
  // }
  const handleInputChange = (e) => {
      setNewDish({
          ...newDish,
          [e.target.name]: e.target.value 
      })
  }
  const submitNewDish = (e)=>{
      console.log('hello')
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
          setShow(false)
      }
  }
    return (
      <>
          <Button 
          variant="outline-dark"
          size="lg" 
          onClick={handleShow}
          >Add a Dish!
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
                <Form onSubmit={submitNewDish}>
                {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                { props.newDishServerError ? <p className="form-error">{props.newDishServerError}</p> : null}
                 <ModalBody>
  
                        {/* {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>} */}
                        {/* { props.newDishServerError ? <p className="form-error">{props.newDishServerError}</p> : null} */}
                        Dish Name: <input onChange={handleInputChange} type="text" name="dishName" />
                        <br />
                        {/* Image: <input onChange={handleInputChange} type="file" name="image" value={newDish.image} accept="image/png, image/jpeg"/>
                        <br /> */}
                        Restaurant: <input onChange={handleInputChange} type="text" name="location"/>
                        <br />
                        Price: <input onChange={handleInputChange} type="number" name="cost" />
                        <br />
                        Category: <input onChange={handleInputChange} type="text" name="category" />
                        <br />
                </ModalBody>
                <ModalFooter>
                  <Button type='submit'>Add the Dish!</Button>
                < Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
              </ModalFooter>
              </Form>
            </FormGroup>
          </Modal>
      </>            
    );
  }


export default AddDishModal;