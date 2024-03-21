import React, { useEffect, useState } from "react";
import { Checkbox, RadioGroup, Radio } from "@nextui-org/react";
import SubSystemChart from "./components/SubSectionChart";
import ComponentChart from "./components/ComponentAnalysis";
import Navbar from "../HomeScreen/Components/Navbar";
import { useDispatch } from "react-redux";
import { setTab } from "../../redux/features/currentTab";

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const [isWithSparesChecked, setIsWithSparesChecked] = useState(true);
  const [isWithSponsorshipChecked, setIsWithSponsorshipChecked] =
    useState(true);
  const [selectedValue, setSelectedValue] = useState("totalPrice");
  useEffect(() => {
    dispatch(setTab("analytics"))
  })
  return (
    <div className="min-h-screen">
      <Navbar/>
      <h1 className="my-2 mx-2">Parameters : </h1>
      <div className="flex justify-around py-4">
        <div className="flex flex-col">
          <Checkbox
            isSelected={isWithSparesChecked}
            onValueChange={setIsWithSparesChecked}
          >
            Just Spares
          </Checkbox>
          <Checkbox
            isSelected={isWithSponsorshipChecked}
            onValueChange={setIsWithSponsorshipChecked}
          >
            With Sponsorship
          </Checkbox>
        </div>
        <div className="flex flex-col">
          <RadioGroup
            value={selectedValue}
            onValueChange={(e) => setSelectedValue(e)}
          >
            <Radio value="unitPrice">Unit Price</Radio>
            <Radio value="quantity">Quantity</Radio>
            <Radio value="netPrice">Net Price</Radio>
            <Radio value="additionalCost">Additional Cost</Radio>
            <Radio value="totalPrice">Total Price</Radio>
          </RadioGroup>
        </div>
      </div>
      <div>
        <SubSystemChart
          spares={isWithSparesChecked}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Suspension"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Powertrain"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"DAQ"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Steering"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Brakes"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Chassis"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Tractive System"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Operations"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
      <div>
        <ComponentChart
          spares={isWithSparesChecked}
          subsystem={"Miscellaneous"}
          sponsor={isWithSponsorshipChecked}
          selectedValue={selectedValue}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
