// import { useState } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}
interface Props {
  sortbyStatus: Array<OptionType>;
  sortby: OptionType | null;
  handleChange: (selectedOption: OptionType | null) => void; // Corrected type definition
}


const DropdownSorting = ({ sortbyStatus, sortby, handleChange }: Props) => {
  return (
    <div className=" h-full">
      {" "}
      <Select
        name="sortby"
        value={sortby}
        options={sortbyStatus}
        onChange={handleChange}
        isClearable={false}
        placeholder="All"
        className="react-select-container sortbyDD bg-black"
        classNamePrefix="react-select"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            cursor: "pointer",
            width: "85px",
            minHeight: "unset", // Remove the minHeight property
            height: "30px", // Set the desired height here
            display: "flex",
            alignItems: "start", // Vertically center the content
            justifyContent: "center",
            backgroundColor: "#FFFFFF1A",
            borderColor: "#959799",
            borderRadius: "8px",
            overflow: "hidden",
            outline: "none",
            padding: "0px",
            margin: "0",

            boxShadow: "none", // Remove default box shadow
            "&:hover": {
              borderColor: "#95979980", // Adjust border color on hover if needed
            },
          }),
          valueContainer: (base) => ({
            ...base,
            // border: "1px solid green",
            padding: "0px",
            display: "flex",
            alignItems: "center", // Vertically center the content
            justifyContent: "center",
            height: "100%",
            width: "max-content",
            margin: "0px",
            // border: "1px solid blue",
          }),
          input: (base) => ({
            ...base,
            //to remove blink '|' for input
            display: "none",
          }),
          singleValue: (base) => ({
            ...base,
            fontFamily: "NeueMontreal",
            color: "#FFFFFF", // Color of the selected option
            fontSize: "11px",
            margin: "0px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid white",
          }),

          menu: (base) => ({
            ...base,
            margin: "4px 0px 0px 0px",
            width: "82px",
            backgroundColor: "#1A1C1E", // Set the background color of the options container
          }),
          menuList: (base) => ({
            ...base,
            padding: "0px",
            backgroundColor: "#FFFFFF1A",
            borderRadius: "4px",
          }),

          option: () => ({
            // ...base,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "2px",
            paddingLeft: "12px",
            paddingBottom: "2px",
            paddingTop: "2px",
            cursor: "pointer",
            fontSize: "12px",
            backgroundColor: "white",
            fontFamily: "NeueMontreal",
            fontWeight: "800",
            border: "1px solid white",
            letterSpacing: "0.1px",
          }),
          indicatorsContainer: (base) => ({
            ...base,
            width: "25%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            // border: "1px solid red",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,

            margin: "0px 0px 60px 0px",
            padding: "0px",
            svg: {
              width: "12px",
              height: "20px",
              marginTop: "4px",
              // border: "1px solid blue",
            },
          }),
          indicatorSeparator: () => ({
            display: "none", //vertical bar
          }),
        }} // Pass the custom styles to the component
      />
    </div>
  );
};

export default DropdownSorting;
