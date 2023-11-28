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

const TableComponent = () => {
  const dispatch = useDispatch();
  const allFoodItems = useSelector(selectAllFoodItems);

  const handleUpdatePriceAndQuantity = (index, newPrice, newQuantity) => {
    dispatch(updatePriceAndQuantity({ index, newPrice, newQuantity }));
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    dispatch(updateQuantity({ index, newQuantity }));
  };

  const handleMarkAsAvailable = (index) => {
    dispatch(markAsAvailable(index));
  };

  const handleMarkAsSoldOut = (index) => {
    dispatch(markAsSoldOut(index));
  };


  const handleAddItem = () => {
    dispatch(
      addItem({
        foodName: "New Item",
        brand: "New Brand",
        price: 9.99,
        quantity: 3,
        total: 29.97,
        status: "",
      })
    );
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
              <button onClick={() => handleUpdatePriceAndQuantity(index, item.price + 1, item.quantity)}>
                  Update Price
                </button>
                <button onClick={() => handleUpdateQuantity(index, item.quantity + 1)}>
                  Update Quantity
                </button>
                <button onClick={() => handleAddItem()}>
                  Add Item
                </button>
                <button onClick={() => handleMarkAsAvailable(index)}>
                  Mark as Available
                </button>
                <button onClick={() => handleMarkAsSoldOut(index)}>
                  Mark as Sold Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
