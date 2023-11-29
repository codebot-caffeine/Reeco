// TableComponent.js
import React from "react";
import { Table } from "react-bootstrap";
import store from "../../reduxAndJson/store";
import {
  updatePriceAndQuantity,
  addItem,
  markAsAvailable,
  markAsSoldOut,
  updateQuantity,
  selectAllFoodItems,
} from "../../reduxAndJson/foodItems";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button, Form } from 'react-bootstrap';

const TableComponent = () => {
  const dispatch = useDispatch();
  const allFoodItems = useSelector(selectAllFoodItems);

  // const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState({
    showModal: false,
    selectedIndex: null,
    newPrice: '',
    newQuantity: '',
  });

  const handleAction = (actionType, ...args) => {
    switch (actionType) {
      case 'updatePriceAndQuantity':
        if (!isValidNumber(modalData.newPrice) || !isValidNumber(modalData.newQuantity) || modalData.newQuantity < 1) {
          alert('Invalid input for price or quantity. Please enter a valid number greater than 0.');
          return;
        }
        dispatch(updatePriceAndQuantity(...args));
        break;
      case 'addItem':
        dispatch(addItem(...args));
        break;
      case 'markAsAvailable':
        dispatch(markAsAvailable(...args));
        break;
      case 'markAsSoldOut':
        dispatch(markAsSoldOut(...args));
        break;
      case 'updateQuantity':
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
      selectedIndex: index,
      newPrice: '',
      newQuantity: '',
    });
  };

  const handleClose = () => {
    setModalData({
      showModal: false,
      selectedIndex: null,
      newPrice: '',
      newQuantity: '',
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allFoodItems.map((item, index) => (
            <tr key={index}>
              <td>{item.foodName}</td>
              <td>{item.brand}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${item.total.toFixed(2)}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  //style={{ color: item.status === 'Available' ? 'green' : item.status === 'Sold Out' ? 'red' : 'black' }}
                  style= {{ color: item.status === 'Available' ? 'green' : '' }} //"success"
                  onClick={() => handleAction("markAsAvailable", index)}
                >
                  Mark as Available
                </Button>
                <Button
                  style={{ color: item.status === 'Sold Out' ? 'red' : '' }}
                  // variant="danger"
                  onClick={() => handleAction("markAsSoldOut", index)}
                >
                  Mark as Sold Out
                </Button>
                <Button variant="primary" onClick={() => handleShow(index)}>
                  Open Modal
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={modalData.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Price and Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPrice">
              <Form.Label>New Price</Form.Label>
              <Form.Control
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
            </Form.Group>
            <Form.Group controlId="formNewQuantity">
              <Form.Label>New Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new quantity"
                value={modalData.newQuantity}
                min={1}
                onChange={(e) =>
                  handleInputChange(e, (value) =>
                    setModalData({ ...modalData, newQuantity: value })
                  )
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleAction("updatePriceAndQuantity", {
                index: modalData.selectedIndex,
                newPrice: parseFloat(modalData.newPrice),
                newQuantity: parseInt(modalData.newQuantity, 10),
              })
            }
          >
            Update Price and Quantity
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableComponent;
