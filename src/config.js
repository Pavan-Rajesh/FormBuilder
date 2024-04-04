export const schema = {
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
    example3: {
      type: "string",
    },
    date: {
      type: "string",
      format: "date",
      description: "schema-based date picker",
    },
  },
};
export const uischema = {
  type: "HorizontalLayout",
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
    {
      type: "Control",
      label: "hello",
      scope: "#/properties/example3",
    },
    { type: "Control", label: "hello", scope: "#/properties/date" },
  ],
};

export const initialData = {
  comments: [
    {
      name: "John Doe",
      message: "This is an example message",
    },
    {
      name: "Max Mustermann",
      message: "Get ready for booohay",
    },
    {},
    {},
  ],
};

// eslint-disable-next-line no-unused-vars
const buildJson = {
  components: [
    {
      index: "1",
      type: "RadioButton",
      label: "checkBoxName", // for the whole radio buttons
      items: ["one", "two", "three", "four"],
      required: true, // may be true or false
      readOnly: false, //may be true or false
      disabled: false, // may be true or false
      //validation comes under required
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const texareaJson = {
  components: [
    {
      type: "SmallText",
      label: "TextName",
      required: true,
      readOnly: false,
      disabled: false,
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const DateJson = {
  components: [
    {
      type: "dateTIme",
      label: "startDate",
      required: true,
      readOnly: false,
      disabled: false,
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const enumAutoCompleteInputJson = {
  components: [
    {
      type: "enumAutoCompleteInput",
      label: "payment",
      items: ["online", "bank", "offline", "someotherway"],
      required: true,
      readOnly: false,
      disabled: false,
    },
  ],
};
