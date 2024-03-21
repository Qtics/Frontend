import React, { useEffect, useState } from "react";
import { mockData } from "../../../assets/data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ComponentChart = ({ selectedValue, sponsor, spares, subsystem }) => {
  // Filter items under the "Suspension" subsystem
  const [allItems, setAllItems] = useState(
    mockData.filter((item) => item.subsystem === subsystem)
  );

  // Function to calculate total cost for a specific item
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
  }, []);

  const calculateSubsystemCosts = () => {
    const subsystemCosts = {};
    allItems.forEach((item) => {
      const totalCost = parseFloat(item[selectedValue]);
      if (!isNaN(totalCost)) {
        if (!subsystemCosts[item.component]) {
          subsystemCosts[item.component] = totalCost;
        } else {
          subsystemCosts[item.component] += totalCost;
        }
      }
    });
    return subsystemCosts;
  };

  const subsystemCosts = calculateSubsystemCosts();
  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
  };

  // Prepare data for pie chart
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
          label: "Magnitude",
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
      <div className="text-xl font-semibold">{subsystem} Subsystem</div>
    </div>
  );
};

export default ComponentChart;
