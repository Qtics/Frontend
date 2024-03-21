// DataTable.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllItems } from "../../../redux/features/item";
const DataTable = () => {
  const allItems = useSelector(state => state.item.allItems);

  const dispatch = useDispatch()

  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/products/")
    response.data.forEach((ele) => {
      if (ele.qty<ele.min_qty) {
        alert(`Low Inventory of ${ele.component}`)
      }
    })

    dispatch(setAllItems(response.data))
  }

  useEffect(() =>{
    fetchData()
  },[]);

  const calculateTotalCost = (item) => {
    const { unit_price, qty, add_cost, discount } = item;

    
  
    // Convert all relevant values to numbers
    const unitPriceNumber = isNaN(parseFloat(unit_price)) ? 0 : parseFloat(unit_price);
    const quantityNumber = isNaN(parseFloat(qty)) ? 0 : parseFloat(qty);
    const additionalCostNumber = isNaN(parseFloat(add_cost)) ? 0: parseFloat(add_cost);
    const discountNumber = isNaN(parseFloat(discount)) ? 0 : parseFloat(discount);
  
    // Check if any of the values are not valid numbers
    if (
      isNaN(unitPriceNumber) ||
      isNaN(quantityNumber) ||
      isNaN(additionalCostNumber) ||
      isNaN(discountNumber)
    ) {
      console.log(isNaN(unit_price))
      return "Invalid"; // Or handle this case appropriately
    }
    
    // Calculate total price without discount
    const totalPrice = unitPriceNumber * quantityNumber;
  
    // Apply discount
    const discountedPrice = totalPrice * (1 - discountNumber / 100);
  
    // Add additional cost
    const totalCost = discountedPrice + additionalCostNumber;
    console.log(totalCost)
    // Ensure totalCost is a valid number before calling toFixed
      // if (isNaN(totalCost)) {
      //   return "Invalid"; // Or handle this case appropriately
      // }
  
    return totalCost.toFixed(2); // Convert totalCost to fixed decimal format
  };
  
  const calculateTotal = () => {
    let total = 0;
    allItems.forEach(item => {
      const totalCost = parseFloat(calculateTotalCost(item));
      if (!isNaN(totalCost) && totalCost !== "Invalid") {
        total += totalCost;
      }
    });
    return total.toFixed(2);
  };    

  return (
    <div className="overflow-x-auto">
        <h1 className="my-2 mx-2 text-white">Total Cost:  Rs. {calculateTotal()}</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subsystem
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assembly
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Component
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Minimum Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Additional Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Discount (%)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {allItems.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.subsystem}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.assembly}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.component}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unit_price}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.qty}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.min_qty}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.add_cost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.discount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calculateTotalCost(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
