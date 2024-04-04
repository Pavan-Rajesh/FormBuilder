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
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

import { CalendarClock, Trash2, X } from "lucide-react";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";
import {
  RadioButtonChecked,
  AutoAwesome,
  CheckBoxOutlined,
} from "@mui/icons-material";
// eslint-disable-next-line no-unused-vars
import { schema, uischema, initialData, tableColumnsJson } from "./config";

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
  const [table, setTable] = useState(null);
  const [columns, setColumns] = useState(null);

  function deleteComponent(rowIndex) {
    const newComponents = [...componentsJson.components];
    const newOnes = newComponents.filter((component, index) => {
      return rowIndex != index;
    });
    setComponents({ components: newOnes });
  }

  function selectTable(tableWithIndex) {
    const [tableName, indexOfTable] = tableWithIndex.split("-");
    setTable(tableName);
    console.log(tableColumnsJson.tables[indexOfTable].columns);
    setColumns(tableColumnsJson.tables[indexOfTable].columns);
  }

  function addComponentForColumn(value) {
    const [label, ui] = value.split("-");
    console.log(label, ui);
    addComponent(ui, label);
  }

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
      } else if (eachComponent.type == "TextArea") {
        // here code should be modified
        myschema.properties[eachComponent.label] = {
          type: "string",
        };
        myUischema.elements.push({
          type: "Control",
          label: eachComponent.label,
          scope: `#/properties/${eachComponent.label}`,
          options: {
            multi: true,
          },
        });
      } else if (eachComponent.type == "CheckBox") {
        // here code should be modified
        myschema.properties[eachComponent.label] = {
          type: "boolean",
        };
        myUischema.elements.push({
          type: "Control",
          label: eachComponent.label,
          scope: `#/properties/${eachComponent.label}`,
        });
      }
    });

    setCustomSchema(myschema);
    setCustomUiSchema(myUischema);
  }

  function addComponent(value, label) {
    const newComponents = [...componentsJson.components];
    console.log(value, label);
    if (value == "RadioButton") {
      //switch case has to be implemented
      newComponents.push({
        type: "RadioButton",
        leftSideLabel: label,
        label: label, // for the whole radio buttons and for displaying the right side label
        items: ["field 1"],
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
        label: label,
        leftSideLabel: label,
        required: true,
        readOnly: false,
        disabled: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "DateTimeInput") {
      newComponents.push({
        type: "DateTimeInput",
        leftSideLabel: label,
        label: label,
        required: true,
        readOnly: false,
        disable: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "enumAutoCompleteInput") {
      newComponents.push({
        type: "enumAutoCompleteInput",
        label: label,
        leftSideLabel: label,
        items: ["field 1"],
        required: true,
        readOnly: false,
        disabled: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "TextArea") {
      newComponents.push({
        type: "TextArea",
        label: label,
        leftSideLabel: label,
        required: true,
        readOnly: false,
        disabled: false,
      });
      setComponents({ components: newComponents });
    } else if (value == "CheckBox") {
      newComponents.push({
        type: "CheckBox",
        leftSideLabel: label,
        label: label, // for the whole checkbox buttons and for displaying the right side label
        numberOfRadios: 4,
        required: true, // may be true or false
        readOnly: false, //may be true or false
        disabled: false, // may be true or false
        //validation comes under required
      });
      console.log(newComponents);
      setComponents({ components: newComponents });
    }
  }

  // to be deleted
  // function addComponent(value) {
  //   const newComponents = [...componentsJson.components];

  //   if (value == "RadioButton") {
  //     //switch case has to be implemented
  //     newComponents.push({
  //       type: "RadioButton",
  //       label: "checkBoxName", // for the whole radio buttons
  //       items: ["one", "two", "three", "four"],
  //       numberOfRadios: 4,
  //       required: true, // may be true or false
  //       readOnly: false, //may be true or false
  //       disabled: false, // may be true or false
  //       //validation comes under required
  //     });
  //     setComponents({ components: newComponents });
  //   } else if (value == "SmallText") {
  //     newComponents.push({
  //       type: "SmallText",
  //       label: "TextName",
  //       required: true,
  //       readOnly: false,
  //       disabled: false,
  //     });
  //     setComponents({ components: newComponents });
  //   } else if (value == "DateTimeInput") {
  //     newComponents.push({
  //       type: "DateTimeInput",
  //       label: "DateTimeName",
  //       required: true,
  //       readOnly: false,
  //       disable: false,
  //     });
  //     setComponents({ components: newComponents });
  //   } else if (value == "enumAutoCompleteInput") {
  //     newComponents.push({
  //       type: "enumAutoCompleteInput",
  //       label: "payment",
  //       items: ["online", "bank", "offline", "someotherway"],
  //       required: true,
  //       readOnly: false,
  //       disabled: false,
  //     });
  //     setComponents({ components: newComponents });
  //   }
  // }

  function updateSmallTextAreaLabel(value, rowIndex) {
    const newComponents = [...componentsJson.components];
    newComponents[rowIndex].label = value;
    setComponents({ components: newComponents });
  }

  function updateTextAreaLabel(value, rowIndex) {
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
    // console.log(componentsJson.components);

    const modifiedComponents = [...componentsJson.components];

    modifiedComponents[rowindex].items.push("another");
    console.log(modifiedComponents);
    setComponents({ components: modifiedComponents });
  }

  function deleteInnerComponent(rowIndex, columnIndex) {
    const newComponents = [...componentsJson.components];

    const radios = newComponents[rowIndex].items;
    const newRadios = radios.filter((eachRadio, index) => {
      return index != columnIndex;
    });
    newComponents[rowIndex].items = newRadios;
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

  function handleCheckBoxLabelChange(rowIndex, value) {
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

    const { type, items, label, leftSideLabel } = component;

    if (type == "RadioButton") {
      return (
        <>
          <div
            key={rowIndex}
            className="border border-gray-700 my-3 p-3 rounded-lg relative"
          >
            <div className="flex my-3 items-center gap-2">
              <div className="font-bold text-xl">{leftSideLabel}</div>
              <RadioButtonChecked />
            </div>
            <Label>change the group label name here</Label>
            <Trash2
              color="red"
              className="absolute right-5 top-5 hover:cursor-pointer"
              onClick={() => deleteComponent(rowIndex)}
            />
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
                <div
                  key={`${rowIndex}+${columnIndex}`}
                  className="flex my-2 relative border rounded-sm "
                >
                  <div className="flex items-center w-full">
                    <Label> Radio - {columnIndex + 1} Label </Label>

                    <Input
                      type="text"
                      value={eachItem}
                      className="outline-none border-none w-full"
                      onChange={(e) => {
                        handleLabelRadioChange(
                          rowIndex,
                          columnIndex,
                          e.target.value
                        );
                      }}
                    />
                  </div>

                  <X
                    color="red"
                    className="absolute right-5 top-2 hover:cursor-pointer"
                    onClick={() => {
                      deleteInnerComponent(rowIndex, columnIndex);
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
          <div className="border my-3 [&>*]:my-3 items-center border-gray-700 p-3 rounded-lg relative">
            <h1 className="font-bold text-xl my-3">{leftSideLabel}</h1>
            <Label>Text Field Label : </Label>
            <Trash2
              color="red"
              className="absolute right-5 top-5 hover:cursor-pointer"
              onClick={() => deleteComponent(rowIndex)}
            />
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
          <div className="border [&>*]:my-3 border-gray-700 my-3 p-3 rounded-lg relative">
            <div className="flex items-center ">
              <div className="font-bold text-xl mr-3">{leftSideLabel}</div>
              <CalendarClock />
            </div>
            <Label>change the label for the date here</Label>
            <Trash2
              color="red"
              className="absolute right-5 top-5 hover:cursor-pointer"
              onClick={() => deleteComponent(rowIndex)}
            />
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
          <div className="border border-gray-700 my-3 p-3 rounded-lg relative">
            <div className="flex gap-2 items-center">
              <div className="font-bold text-xl">AutoComplete Component</div>
              <AutoAwesome />
            </div>
            <div>
              <Label>change the group label name here</Label>
              <Trash2
                color="red"
                className="absolute right-5 top-5 hover:cursor-pointer"
                onClick={() => deleteComponent(rowIndex)}
              />
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
                  className="flex  items-center my-3 relative"
                >
                  <div className="w-full">
                    <Label>DropDown Option {columnIndex + 1}</Label>
                    <Input
                      type="text"
                      defaultValue={eachItem}
                      name="EnumAutoCompleteValueInput"
                      className="w-full"
                      onChange={(e) => {
                        EnumAutoCompleteValueInput(
                          rowIndex,
                          columnIndex,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                  <X
                    color="red"
                    className="absolute top-8 right-5 cursor-pointer"
                    onClick={deleteInnerComponent(rowIndex, columnIndex)}
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
    } else if (type == "TextArea") {
      return (
        <div className="border my-3 [&>*]:my-3 items-center border-gray-700 p-3 rounded-lg relative">
          <h1 className="font-bold text-xl my-3">{leftSideLabel}</h1>
          <Label>TextArea Field Label : </Label>
          <Trash2
            color="red"
            className="absolute right-5 top-5 hover:cursor-pointer"
            onClick={() => deleteComponent(rowIndex)}
          />
          <Input
            type="text"
            name="smallTextLabel"
            defaultValue="Change Here"
            onChange={(e) => {
              updateTextAreaLabel(e.target.value, rowIndex);
            }}
          />
        </div>
      );
    } else if (type == "CheckBox") {
      return (
        <>
          <div
            key={rowIndex}
            className="border border-gray-700 my-3 p-3 rounded-lg relative"
          >
            <div className="flex my-3 items-center gap-2">
              <div className="font-bold text-xl">{leftSideLabel}</div>
              <CheckBoxOutlined />
            </div>
            <Label>change the group label name here</Label>
            <Trash2
              color="red"
              className="absolute right-5 top-5 hover:cursor-pointer"
              onClick={() => deleteComponent(rowIndex)}
            />
            <Input
              type="text"
              name="CheckBoxGroupLabel"
              defaultValue="Group Name"
              onChange={(e) => {
                handleCheckBoxLabelChange(rowIndex, e.target.value);
              }}
            />
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="w-screen max-w-7xl border-2 min-h-screen">
        {/* this is on the left side */}

        <Select
          onValueChange={(value) => {
            selectTable(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tables</SelectLabel>
              {tableColumnsJson.tables.map((eachTable, index) => {
                return (
                  <SelectItem
                    value={eachTable.name + "-" + index}
                    key={eachTable.name}
                  >
                    {eachTable.name}
                  </SelectItem>
                );
              })}
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            addComponentForColumn(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Columns</SelectLabel>
              {columns?.map((eachColumn) => {
                return (
                  <SelectItem
                    key={eachColumn.label + "-" + eachColumn.ui}
                    value={eachColumn.label + "-" + eachColumn.ui}
                  >
                    {eachColumn.label}
                  </SelectItem>
                );
              })}
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
                <SelectItem value="CheckBox">Checkbox</SelectItem>
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
