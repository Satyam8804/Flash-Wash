import React, { useEffect, useRef, useState } from "react";
import { fetchAllService, scheduleService } from "../utils/service";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { Link, Outlet, useNavigate } from "react-router-dom";
const ServiceDashBoard = () => {
    const navigate=useNavigate()
    const [allService,setAllService]=useState([])
    const loginStatus=localStorage.getItem('isLoggedIn');
    const[status,setStatus]=useState(loginStatus)
    useEffect(()=>{
      setStatus(loginStatus)
    },[loginStatus])
    console.log('logi',loginStatus)
    const getData=async()=>{
        const res = await fetchAllService()
        setAllService(res)
    }

    const postAppointment=async()=>{
      const res = await scheduleService()
      if(res===true){
        handleClose();
      }else{
        alert(res)
        handleClose();
      }
    }
    useEffect(()=>{
        getData()
    },[])


    const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);window.location.reload()};
  const handleShow = () => setShow(true);

  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const currentServiceId=useRef(null)

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log('Submitted:', scheduleDate, address, notes);
    if(status.trim()==="true"){
      const res = await scheduleService(currentServiceId.current,scheduleDate,address,notes)
      if(res===true){
        toast.success("Appointment added successfully")
        navigate('/api/v1/users/profile/appointment')
      }else{
        toast.success("Appointment added successfully")
        navigate('/api/v1/users/profile/appointment')
      }
    }else{
      toast.error("Please Login to continue")
    }
    
    //postAppointment(currentServiceId.current,scheduleDate,address,notes)
    //handleClose(); // Close the modal after submission
  };
  return (
    <div>
      <div class="row">
       {allService!=="error" && allService.length>0 && allService.map((ele)=>{
             return <div key={ele._id} class="col-sm-6 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{ele.name}</h5>
                <img src={ele.serviceImage} />
                <p class="card-text">
                  {ele.description}
                </p>
                <p class="card-text">
                  Price -: ₹{ele.price}
                </p>
                <p class="card-text">
                  Category -: {ele.category}
                </p>
                <p class="card-text">
                VehicleType -: {ele.vehicleType}
                </p>
                <a onClick={()=>{
                  console.log("inside login",status)
                  if(status.trim()==="true"){
                    handleShow();
                  }else{
                    toast.error("Please login to continue")
                  }
                  
                  currentServiceId.current=ele._id
                  }} class="btn btn-primary">
                  Book Now
                </a>
              </div>
            </div>
  
            
  
          </div>
       }) }

        
      </div>
      <Modal backdrop="static"
        keyboard={false}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="scheduleDate">
              <Form.Label>Schedule Date</Form.Label><br/>
              <DatePicker
                selected={scheduleDate}
                onChange={(date) => setScheduleDate(date)}
                dateFormat="yyyy-MM-dd" // Set your desired date format
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary-buttom" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary-button" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceDashBoard;
