import { GeneresProps, sortDataType } from "@/types/MovieDetail/Detail";
import { StylesConfig } from "react-select";

const colourStyles: StylesConfig<GeneresProps> = {
  control: (baseStyle) => ({
    ...baseStyle,
    background: "#173d77",
    fontWeight: 500,
    border: 0,
    color: "white",
    minWidth: 250,
    maxWidth: 500,
    width: "100%",
    boxShadow: "none",
    outline: 0,
    borderRadius: 30,
  }),
  valueContainer: (baseStyle) => ({
    ...baseStyle,
    color: "white",
    margin: "0 10px",
  }),
  placeholder: (baseStyle) => ({
    ...baseStyle,
    color: "#a7c7bc",
  }),
  input: (baseStyle) => ({
    ...baseStyle,
    color: "white",
  }),
  menu: (baseStyle) => ({
    ...baseStyle,
    top: 40,
    margin: 0,
    padding: 0,
    color: "#1c4b91",
  }),
  multiValue: (baseStyle) => ({
    ...baseStyle,
    borderRadius: 20,
    padding: "3px 10px",
    background: "#020c1b",
  }),
  multiValueLabel: (baseStyle) => ({
    ...baseStyle,
    color: "white",
  }),
  multiValueRemove: (baseStyle) => ({
    ...baseStyle,
    background: "transparent",
    color: "white",
    padding: "0 1px",
    cursor: "pointer",
    ":hover": {
      background: "y",
    },
  }),
};

const colourStyles2: StylesConfig<sortDataType> = {
  control: (baseStyle) => ({
    ...baseStyle,
    background: "#173d77",
    fontWeight: 500,
    border: 0,
    color: "white",
    minWidth: 250,
    maxWidth: 500,
    width: "100%",
    boxShadow: "none",
    outline: 0,
    borderRadius: 30,
  }),
  valueContainer: (baseStyle) => ({
    ...baseStyle,
    color: "white",
    margin: "0 10px",
  }),
  placeholder: (baseStyle) => ({
    ...baseStyle,
    color: "#a7c7bc",
  }),
  input: (baseStyle) => ({
    ...baseStyle,
    color: "white",
  }),
  menu: (baseStyle) => ({
    ...baseStyle,
    top: 40,
    margin: 0,
    padding: 0,
    color: "#1c4b91",
  }),
  singleValue: (baseStyle) => ({
    ...baseStyle,
    color: "white",
  }),
};

export { colourStyles, colourStyles2 };
