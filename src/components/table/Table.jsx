// TableComponent.js
import React from "react";
import { Container, Table } from "react-bootstrap";
import { reasons } from "../../reduxAndJson/json";
import store from "../../reduxAndJson/store";
import {
  updatePriceAndQuantity,
  addItem,
  markAsAvailable,
  markAsSoldOut,
  markAsSoldOutUrgent,
  updateQuantity,
  selectAllFoodItems,
} from "../../reduxAndJson/foodItems";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal, Button, Form } from "react-bootstrap";

//
import "./Table.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TableComponent = () => {
  const dispatch = useDispatch();
  const allFoodItems = useSelector(selectAllFoodItems);

  // const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState({
    showModal: false,
    showConfirmationModal: false,
    selectedIndex: null,
    newPrice: "",
    newQuantity: "",
    status: "",
  });

  const total = allFoodItems.reduce((x, y) => {
    return Math.round(x.price) + Math.round(y.price);
  });

  const TextExample = () => {
    return (
      <Card className="mb-3">
        <Card.Body>
          <ListGroup>
            <div className="d-flex justify-content-between listClass">
              <div>
                <p>Supplier</p>
                <h5>East coast fruits & vegetables</h5>
              </div>
              <div>
                <p>Shipping Date</p>
                <h5>{new Date().toDateString()}</h5>
              </div>
              <div>
                <p>Total</p>
                <h5>15367.63</h5>
              </div>
              <div>
                <p>Category</p>
                <h5>East coast fruits & vegetables</h5>
              </div>
              <div>
                <p>Department</p>
                <h5>300-444-678</h5>
              </div>
              <div>
                <p>Status</p>
                <h5>Awaiting your approval</h5>
              </div>
            </div>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  const handleAction = (actionType, ...args) => {
    // console.log(args);
    console.log(actionType,args);
    switch (actionType) {
      
      case "updatePriceAndQuantity":
        if (
          !isValidNumber(modalData.newPrice) ||
          !isValidNumber(modalData.newQuantity) ||
          modalData.newQuantity < 1 ||
          modalData.newPrice < 1
        ) {
          alert(
            "Invalid input for price or quantity. Please enter a valid number greater than 0."
          );
          return;
        }
        dispatch(updatePriceAndQuantity(...args));
        break;
      case "addItem":
        dispatch(addItem(...args));
        break;
      case "markAsAvailable":
        dispatch(markAsAvailable(...args));
        break;
      case "markAsSoldOut":
        dispatch(markAsSoldOut(...args));
        break;
      case "markAsSoldOutUrgent":
          dispatch(markAsSoldOutUrgent(...args));
          break;
      case "updateQuantity":
        dispatch(updateQuantity(...args));
        break;
      default:
        break;
    }
    handleClose();
  };

  const handleShow = (index) => {
    setModalData({
      showModal: true,
      showConfirmationModal: false,
      selectedIndex: index,
      newPrice: "",
      newQuantity: "",
      status: "",
    });
  };

  const handleShowConfirm = (index) => {
    setModalData({
      showModal: false,
      showConfirmationModal: true,
      selectedIndex: index,
      newPrice: "",
      newQuantity: "",
      status: "",
    });
  };

  const handleClose = () => {
    setModalData({
      showModal: false,
      showConfirmationModal: false,
      selectedIndex: null,
      newPrice: "",
      newQuantity: "",
      status: "",
    });
  };

  const handleCloseRetain = () => {
    setModalData({
      showModal: false,
      showConfirmationModal: false,
      selectedIndex: null,
      newPrice: "",
      newQuantity: "",
      // status: "",
    });
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isValidNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  return (
    <div className="container mt-4">
      <TextExample />
      <Card>
        <Container className="my-3">
          <Row>
            <Col>
              {" "}
              <InputGroup className="inputSearch">
                <Form.Control />
                <InputGroup.Text id="basic-addon2">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col className="text-end">
              <button type="button" className="btn btn-outline-primary addItem">
                Add Item
              </button>
              <i class="fa-solid fa-print" style={{ color: "green" }}></i>
            </Col>
          </Row>
        </Container>

        <Card.Body>
          <Table borderless hover className="tableCss">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allFoodItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={"/images/Avocadohass.jpg"}
                      alt="Your Image"
                      style={{ height: "20px", width: "20px" }}
                    />
                    {item.foodName}
                  </td>
                  <td>{item.brand}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${item.total.toFixed(2)}</td>
                  <td>
                    <Button
                      className={
                        item.status == "Available"
                          ? "approved"
                          : item.status == "Sold Out Urgent"
                          ? "needed"
                          : item.status == "Sold Out"
                          ? "neededNormal"
                          : "approved"
                      }
                    >
                      {item.status == "Available"
                        ? "Approved"
                        : item.status == "Sold Out"
                        ? "Missing" :
                        item.status == "Sold Out Urgent"
                        ? "Missing-Urgent"
                        : item.status}
                    </Button>
                  </td>
                  <td>
                    <Button
                      //style={{ color: item.status === 'Available' ? 'green' : item.status === 'Sold Out' ? 'red' : 'black' }}
                      style={{
                        color: item.status === "Available" ? "green" : "",background:'transparent'
                      }} //"success"
                      className="button-design"
                      onClick={() => handleAction("markAsAvailable", index)}
                      // onClick={() => handleShowConfirm(index)}
                    >
                      <i class="fa-solid fa-check"></i>
                    </Button>
                    <Button
                      style={{ color: item.status === "Sold Out" ? "red" :item.status === "Sold Out Urgent" ? "red" :"" ,background:'transparent'}}
                      className="button-design"
                      disabled = {item.status === "Sold Out" || item.status === "Sold Out Urgent"}
                      // variant="danger"
                      //onClick={() => handleAction("markAsSoldOut", index)}
                      onClick={() => handleShowConfirm(index)}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </Button>
                    <Button
                      className="button-design"
                      variant="primary"
                      onClick={() => handleShow(index)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={modalData.showModal} onHide={handleClose}>
        <div class="container-div">
          <div class="cross_icon">
            <i class="fa fa-close" onClick={handleCloseRetain}></i>
          </div>
          <div>
            <p class="head_text">
              {allFoodItems[modalData.selectedIndex]?.foodName}
            </p>
          </div>
          <div class="price_box">
            <div>
              <img src={"/images/Avocadohass.jpg"} alt="" />
            </div>
            <div class="label_box">
              <label for="name">Price($)</label>
              <label for="name">Quantity</label>
            </div>
            <div class="input_box">
              <input
                name="number"
                type="number"
                placeholder="Enter new price"
                value={modalData.newPrice}
                min={1}
                onChange={(e) =>
                  handleInputChange(e, (value) =>
                    setModalData({ ...modalData, newPrice: value })
                  )
                }
              />
              <input
                type="number"
                name="number"
                placeholder="Enter new quantity"
                value={modalData.newQuantity}
                min={1}
                onChange={(e) =>
                  handleInputChange(e, (value) =>
                    setModalData({ ...modalData, newQuantity: value })
                  )
                }
              />
            </div>
          </div>

          <div>
            <p class="head_text">
              Choose Reason <span class="sub_text">(Optional)</span>
            </p>
            <div class="btn_box">
              {reasons.map((e, i) => {
                return (
                  <button
                    key={i}
                    style={{borderColor:modalData.status == e ? 'blue' : ''}}
                    onClick={() => setModalData({ ...modalData, status: e })}
                  >
                    {e}
                  </button>
                );
              })}
              {/* <button>Missing Product</button>
              <button>Quantity is not the same</button>
              <button>Price is not the same</button>
              <button>Other</button> */}
            </div>
          </div>
          <div class="btn2_box">
            <button class="cls" onClick={handleClose}>
              Cancel
            </button>
            <button
              class="send"
              onClick={() =>
                handleAction("updatePriceAndQuantity", {
                  index: modalData.selectedIndex,
                  newPrice: parseFloat(modalData.newPrice),
                  newQuantity: parseInt(modalData.newQuantity, 10),
                  status: modalData.status,
                })
              }
            >
              Send
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={modalData.showConfirmationModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Missing product?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Is {allFoodItems[modalData.selectedIndex]?.foodName} missing</p>
          <div>
            <Button className="cls"  onClick={() => setModalData({ ...modalData, status: 'Sold Out' })}>missing?</Button>
            <Button  className="cls"  onClick={() => setModalData({ ...modalData, status: 'Sold Out Urgent' })} >Urgent?</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={() => handleClose()}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            No
          </Button>
          <Button
            variant="info"
            onClick={() =>
              modalData.status == 'Sold Out' ? handleAction("markAsSoldOut", modalData.selectedIndex) :
              modalData.status == 'Sold Out Urgent' ? handleAction("markAsSoldOutUrgent", modalData.selectedIndex)
              :  handleAction("markAsSoldOut", modalData.selectedIndex)
            }
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableComponent;
