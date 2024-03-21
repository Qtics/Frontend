//InputForm.jsx
import React from "react";
import { Select, SelectItem, Input, Textarea, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAssembly,
  setComponent,
  setDescription,
  setUnitPrice,
  setQuantity,
  setMinimumQuantity,
  setAdditionalCost,
  setDiscount,
  setSubsystem,
  setAllItems,
  addItem,
} from "../../../redux/features/item";
import axios from "axios";

const subsystemOptions = [
  "Suspension",
  "Powertrain",
  "DAQ",
  "Steering",
  "Brakes",
  "Miscellaneous",
  "Chassis",
  "Tractive System",
  "Operations",
];

const InputForm = () => {
  const dispatch = useDispatch();
  const subsystem = useSelector((state) => state.item.subsystem);
  const assembly = useSelector((state) => state.item.assembly);
  const component = useSelector((state) => state.item.component);
  const description = useSelector((state) => state.item.description);
  const unitPrice = useSelector((state) => state.item.unitPrice);
  const quantity = useSelector((state) => state.item.quantity);
  const minimumQuantity = useSelector((state) => state.item.minimumQuantity);
  const additionalCost = useSelector((state) => state.item.additionalCost);
  const discount = useSelector((state) => state.item.discount);
  const currentList = useSelector((state) => state.item.allItems);

  const handleAssemblyChange = (value) => {
    dispatch(setAssembly(value));
  };

  const handleComponentChange = (value) => {
    dispatch(setComponent(value));
  };

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value));
  };

  const handleUnitPriceChange = (value) => {
    dispatch(setUnitPrice(value));
  };

  const handleQuantityChange = (value) => {
    dispatch(setQuantity(value));
  };

  const handleMinimumQuantityChange = (value) => {
    dispatch(setMinimumQuantity(value));
  };

  const handleAdditionalCostChange = (value) => {
    dispatch(setAdditionalCost(value));
  };

  const handleDiscountChange = (value) => {
    dispatch(setDiscount(value));
  };

  const handleAddItem = async () => {
    const newItem = {
      subsystem,
      assembly,
      component,
      description,
      unitPrice,
      quantity,
      minimumQuantity,
      additionalCost,
      discount,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/`,
        {
          subsystem: subsystem, 
          assembly: assembly,
          component: component,
          description: description,
          unit_price: unitPrice,
          qty: quantity,
          min_qty: minimumQuantity,
          add_cost: additionalCost,
          discount: discount,
        }
      );
      if (response.data.success) {
        dispatch(addItem(newItem));
      }
    } catch (error) {
      console.log("Can't add the record");
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold text-2xl mb-2">Add a Record</h1>
      <Select
        className="min-w-"
        label="Select a Subsystem"
        onSelectionChange={(e) => dispatch(setSubsystem(e.currentKey))}
      >
        {subsystemOptions.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </Select>
      <Input
        value={assembly}
        type="text"
        label="Assembly"
        onValueChange={handleAssemblyChange}
      />
      <Input
        value={component}
        type="text"
        label="Component"
        onValueChange={handleComponentChange}
      />
      <Textarea
        value={description}
        label="Description"
        maxRows={4}
        onValueChange={handleDescriptionChange}
      />
      <div className="flex gap-2">
        <Input
          value={unitPrice}
          type="number"
          label="Unit Price"
          onValueChange={handleUnitPriceChange}
        />
        <Input
          value={quantity}
          type="number"
          label="Quantity"
          onValueChange={handleQuantityChange}
        />
      </div>
      <Input
        value={minimumQuantity}
        type="number"
        label="Minimum Quantity"
        onValueChange={handleMinimumQuantityChange}
      />
      <Input
        value={additionalCost}
        type="number"
        label="Additional Cost"
        onValueChange={handleAdditionalCostChange}
      />
      <Input
        value={discount}
        type="number"
        label="Discount(Sponsorship)"
        onValueChange={handleDiscountChange}
      />
      <Button onClick={handleAddItem} className="bg-yellow-200 font-semibold">
        Add Record
      </Button>
    </div>
  );
};

export default InputForm;
