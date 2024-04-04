import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarClock } from "lucide-react";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";
import { RadioButtonChecked, AutoAwesome } from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { schema, uischema, initialData } from "./config";

import { Button, buttonVariants } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
export default function App() {
  const [data, setData] = useState(initialData);
  const [customSchema, setCustomSchema] = useState({
    type: "object",
    properties: {
      exampleRadioEnum: {
        type: "string",
        enum: ["One", "Two", "Three"],
      },
      example2: {
        type: "string",
        enum: ["5", "hello", "2", "90"],
      },
    },
  });
  const [customUiSchema, setCustomUiSchema] = useState({
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        label: "Name",
        scope: "#/properties/exampleRadioEnum",
        options: {
          format: "radio",
        },
      },
      {
        type: "Control",
        label: "Birth Date",
        scope: "#/properties/example2",
        options: {
          format: "radio",
        },
      },
    ],
  });
  const [componentsJson, setComponents] = useState({
    components: [],
  });

  function generateSchema() {
    const { components } = componentsJson;
    let myschema = { type: "object", properties: {} };
    let myUischema = { type: "VerticalLayout", elements: [] };
    components.map((eachComponent) => {
      if (eachComponent.type == "RadioButton") {
        myschema.properties[eachComponent.label] = {
          type: "string",
          enum: eachComponent.items,
        };
        myUischema.elements.push({
          type: "Control",
          label: eachComponent.label,
          scope: `#/properties/${eachComponent.label}`,
          options: {
            format: "radio",
          },
        });
      } else if (eachComponent.type == "SmallText") {
        myschema.properties[eachComponent.label] = {
          type: "string",
        };
        myUischema.elements.push({
          type: "Control",
          label: eachComponent.label,
          scope: `#/properties/${eachComponent.label}`,
        });
      } else if (eachComponent.type == "DateTimeInput") {
        (myschema.properties[eachComponent.label] = {
          type: "string",
          format: "date-time",
          description: "schema-based date picker",
        }),
          myUischema.elements.push({
            type: "Control",
            label: eachComponent.label,
            scope: `#/properties/${eachComponent.label}`,
          });
      } else if (eachComponent.type == "enumAutoCompleteInput") {
        myschema.properties[eachComponent.label] = {
          type: "string",
          enum: eachComponent.items,
        };
        myUischema.elements.push({
          type: "Control",
          label: eachComponent.label,
          scope: `#/properties/${eachComponent.label}`,
          options: {
            autocomplete: true,
          },
        });
      }
    });

    setCustomSchema(myschema);
    setCustomUiSchema(myUischema);

    console.log(myschema);
    console.log(myUischema);
  }

  function addComponent(value) {
    const newComponents = [...componentsJson.components];

    if (value == "RadioButton") {
      //switch case has to be implemented
      newComponents.push({
        type: "RadioButton",
        label: "checkBoxName", // for the whole radio buttons
        items: ["one", "two", "three", "four"],
        numberOfRadios: 4,
        required: true, // may be true or false
        readOnly: false, //may be true or false
        disabled: false, // may be true or false
        //validation comes under required
      });
      setComponents({ components: newComponents });
    } else if (value == "SmallText") {
      newComponents.push({
        type: "SmallText",
        label: "TextName",
        required: true,
        readOnly: false,
        disabled: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "DateTimeInput") {
      newComponents.push({
        type: "DateTimeInput",
        label: "DateTimeName",
        required: true,
        readOnly: false,
        disable: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "enumAutoCompleteInput") {
      newComponents.push({
        type: "enumAutoCompleteInput",
        label: "payment",
        items: ["online", "bank", "offline", "someotherway"],
        required: true,
        readOnly: false,
        disabled: false,
      });
      setComponents({ components: newComponents });
    }
  }

  function updateSmallTextAreaLabel(value, rowIndex) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].label = value;
    setComponents({ components: newComponents });
  }

  function EnumAutoCompleteValueInput(rowIndex, columnIndex, value) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].items[columnIndex] = value;
    setComponents({ components: newComponents });
  }

  function handleAddOptionEnumAutoComplete(rowindex) {
    const newComponents = [...componentsJson.components];
    newComponents[rowindex].items.push("another");
    setComponents({ components: newComponents });
  }

  function handleChangeRadio(index) {
    const newComponents = [...componentsJson.components];
    newComponents[index].items.push("another");
    setComponents({ components: newComponents });
  }

  function handleLabelRadioChange(rowIndex, columnIndex, value) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].items[columnIndex] = value;
    setComponents({ components: newComponents });
  }

  function handleRadioLabelChange(rowIndex, value) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].label = value;
    setComponents({ components: newComponents });
  }

  function handleEnumAutoCompleteLabel(rowIndex, value) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].label = value;
    setComponents({ components: newComponents });
  }

  function updateDateTimeLabel(value, rowIndex) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].label = value;
    setComponents({ components: newComponents });
  }

  function displayComponent(component, rowIndex) {
    // console.log(component);
    const { type, items, label } = component;
    if (type == "RadioButton") {
      return (
        <>
          <div
            key={rowIndex}
            className="border border-gray-700 my-3 p-3 rounded-lg"
          >
            <div className="flex my-3 items-center gap-2">
              <div className="font-bold text-xl">RadioButton Component</div>
              <RadioButtonChecked />
            </div>
            <Label>change the group label name here</Label>
            <Input
              type="text"
              name="radioGroupLabel"
              defaultValue="Group Name"
              onChange={(e) => {
                handleRadioLabelChange(rowIndex, e.target.value);
              }}
            />

            {items.map((eachItem, columnIndex) => {
              return (
                <div key={`${rowIndex}+${columnIndex}`} className="flex my-2">
                  <Label> Radio - {columnIndex + 1} Label </Label>
                  <Input
                    type="text"
                    value={eachItem}
                    onChange={(e) => {
                      handleLabelRadioChange(
                        rowIndex,
                        columnIndex,
                        e.target.value
                      );
                    }}
                  />
                </div>
              );
            })}
            <Button
              type="Button"
              className="border"
              name="addRadio"
              onClick={() => handleChangeRadio(rowIndex)}
            >
              click to add radio
            </Button>
          </div>
        </>
      );
    } else if (type == "SmallText") {
      return (
        <>
          <div className="border my-3 [&>*]:my-3 items-center border-gray-700 p-3 rounded-lg">
            <h1 className="font-bold text-xl my-3">TextField Component</h1>
            <Label>Text Field Label : </Label>
            <Input
              type="text"
              name="smallTextLabel"
              defaultValue="Change Here"
              onChange={(e) => {
                updateSmallTextAreaLabel(e.target.value, rowIndex);
              }}
            />
          </div>

          {/* this text area should be styled */}
        </>
      );
    } else if (type == "DateTimeInput") {
      return (
        <>
          <div className="border [&>*]:my-3 border-gray-700 my-3 p-3 rounded-lg">
            <div className="flex items-center ">
              <div className="font-bold text-xl mr-3">Date Time</div>
              <CalendarClock />
            </div>
            <Label>change the label for the date here</Label>
            <Input
              type="text"
              name="DateTimeFieldLabel"
              onChange={(e) => updateDateTimeLabel(e.target.value, rowIndex)}
              defaultValue={"change text for the date field"}
            />
          </div>
        </>
      );
    } else if (type == "enumAutoCompleteInput") {
      return (
        <>
          <div className="border border-gray-700 my-3 p-3 rounded-lg">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-xl">AutoComplete Component</div>
              <AutoAwesome />
            </div>
            <div>
              <Label>change the group label name here</Label>
              <Input
                type="text"
                name="enumAutoCompleteInputLabel"
                onChange={(e) => {
                  handleEnumAutoCompleteLabel(rowIndex, e.target.value);
                }}
                defaultValue={label}
              />
            </div>
            {items.map((eachItem, columnIndex) => {
              return (
                <div
                  key={`${rowIndex}+${columnIndex}`}
                  className="flex  items-center my-3"
                >
                  <Label>DropDown Option {columnIndex + 1}</Label>
                  <Input
                    type="text"
                    defaultValue={eachItem}
                    name="EnumAutoCompleteValueInput"
                    onChange={(e) => {
                      EnumAutoCompleteValueInput(
                        rowIndex,
                        columnIndex,
                        e.target.value
                      );
                    }}
                  />
                </div>
              );
            })}
            <Button
              type="Button"
              className="border"
              name="addOptionEnumAutoComplete"
              onClick={() => handleAddOptionEnumAutoComplete(rowIndex)}
            >
              click to add option for auto complete
            </Button>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="w-screen max-w-7xl border-2 min-h-screen">
        {/* this is on the left side */}

        <div className="flex flex-col md:flex-row">
          <div className="flex-grow border-4 p-4">
            <Select
              onValueChange={(value) => {
                addComponent(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select UI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Checkbox">Checkbox</SelectItem>
                <SelectItem value="RadioButton">RadioButton</SelectItem>
                <SelectItem value="DropDown">DropDown</SelectItem>
                <SelectItem value="enumAutoCompleteInput">
                  Enum auto Complete Input
                </SelectItem>
                <SelectItem value="SmallText">SmallText</SelectItem>
                <SelectItem value="TextArea">Textarea</SelectItem>
                <SelectItem value="DateTimeInput">DateTimeInput</SelectItem>
              </SelectContent>
            </Select>

            {componentsJson.components.map((eachComponent, index) => {
              return displayComponent(eachComponent, index);
            })}

            <Button
              type="Button"
              onClick={() => {
                generateSchema();
              }}
              className={buttonVariants({
                variant: "primary",
                className: "bg-green-600 my-5",
              })}
            >
              click to generate the Form
            </Button>
          </div>
          {/* this should be on the right side */}
          <div className="flex-grow  border-4 p-4">
            <div>
              <JsonForms
                schema={customSchema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                uischema={customUiSchema}
                onChange={({ data }) => {
                  setData(data);
                }}
              />
              <Button className="bg-green-600">submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
