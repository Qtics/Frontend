import React, { useEffect, useState } from "react";
import { mockData } from "../../../assets/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const SubSystemChart = ({ selectedValue, sponsor, spares }) => {
  const [allItems, setAllItems] = useState(mockData);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8000/products/")
    const temp = response.data;
    temp.forEach((e) => {
      e.discount == null ? e.discount = 0: null
      e.unitPrice = parseFloat(e.unit_price )
      e.quantity = parseFloat(e.qty)
      e.minimumQuantity = parseFloat(e.min_qty)
      e.additionalCost = parseFloat(e.min_qty)
    })
    setAllItems(temp)
  }

  useEffect(()=> {
    fetchData()
  },[])

  // Function to calculate total cost for each item
  const calculateTotalCost = (item) => {
    const { unitPrice, quantity, additionalCost, discount, minimumQuantity } =
      item;
    const totalPrice = spares
      ? unitPrice * (quantity - minimumQuantity)
      : unitPrice * minimumQuantity;
    const discountedPrice = sponsor ? totalPrice * (1 - discount / 100) : 0;
    const totalCost = discountedPrice + additionalCost;
    return totalCost.toFixed(2);
  };

  const calculateNetPrice = (item) => {
    const { unitPrice, quantity, minimumQuantity } = item;
    return spares
      ? unitPrice * (quantity - minimumQuantity).toFixed(2)
      : unitPrice * minimumQuantity.toFixed(2);
  };

  const setTotalCost = () => {
    const temp = allItems;
    
    temp.forEach((item) => {
      const totalCost = calculateTotalCost(item);
      const netPrice = calculateNetPrice(item);
      item["totalPrice"] = totalCost;
      item["netPrice"] = netPrice;
    });
    setAllItems(temp);
  };

  useEffect(() => {
    setTotalCost();
  }, [sponsor, selectedValue, spares]);

  // Function to calculate total cost of all items
  const calculateTotalCostOfAllItems = () => {
    let totalCost = 0;
    allItems.forEach((item) => {
      const itemTotalCost = parseFloat(calculateTotalCost(item));
      if (!isNaN(itemTotalCost)) {
        totalCost += itemTotalCost;
      }
    });
    return totalCost.toFixed(2);
  };

  const totalCostOfAllItems = calculateTotalCostOfAllItems();

  // Function to calculate subsystem costs
  const calculateSubsystemCosts = () => {
    const subsystemCosts = {};
    var t =0;
    allItems.forEach((item) => {
      const totalCost = parseFloat(item[selectedValue]);
      t += totalCost
      console.log(selectedValue); // Use selectedValue here
      if (!isNaN(totalCost)) {
        if (!subsystemCosts[item.subsystem]) {
          subsystemCosts[item.subsystem] = totalCost;
        } else {
          subsystemCosts[item.subsystem] += totalCost;
        }
      }
    });
    console.log(t);
    return subsystemCosts;
  };

  const subsystemCosts = calculateSubsystemCosts();

  // Function to generate random color
  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
  };

  // Prepare data for pie chart based on selected value
  const prepareChartData = () => {
    const labels = Object.keys(subsystemCosts);
    const data = Object.values(subsystemCosts);

    let backgroundColors = [];
    let borderColors = [];

    labels.forEach(() => {
      backgroundColors.push(generateRandomColor());
      borderColors.push(generateRandomColor().replace("0.2", "1"));
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Subsystem Magnitude",
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const pieChartData = prepareChartData();

  return (
    <div className="flex flex-col-reverse  sm:flex-row justify-around items-center bg-yellow-200 m-10 p-2 rounded">
      <div className="overflow-x-auto">
        <div className="my-4 mx-auto" style={{ width: "400px" }}>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="flex flex-col items-center" >
        <h1 className="text-xl font-semibold">Subsystem - Wise Cost Analysis</h1>
        
      </div>
    </div>
  );
};

export default SubSystemChart;
