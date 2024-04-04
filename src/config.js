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

export const tableColumnsJson = {
  tables: [
    {
      name: "users",
      columns: [
        {
          label: "ID",
          key: "id",
          type: "integer",
          ui: "enumAutoCompleteInput",
        },
        { label: "Name", key: "name", type: "string", ui: "SmallText" },
        { label: "Email", key: "email", type: "string", ui: "SmallText" },
        { label: "Password", key: "password", type: "string", ui: "SmallText" }, // to be replace by password
        {
          label: "Created At",
          key: "created_at",
          type: "datetime",
          ui: "DateTimeInput",
        },
        {
          label: "Updated At",
          key: "updated_at",
          type: "datetime",
          ui: "DateTimeInput",
        },
        {
          label: "Status",
          key: "status",
          type: "string",
          ui: "RadioButton",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
          ],
        },
      ],
    },
    {
      name: "products",
      columns: [
        { label: "ID", key: "id", type: "integer", ui: "text" },
        { label: "Name", key: "name", type: "string", ui: "text" },
        {
          label: "Description",
          key: "description",
          type: "text",
          ui: "textarea",
        },
        { label: "Price", key: "price", type: "decimal", ui: "text" },
        {
          label: "Category ID",
          key: "category_id",
          type: "integer",
          ui: "select",
        },
        {
          label: "Created At",
          key: "created_at",
          type: "datetime",
          ui: "text",
        },
        {
          label: "Updated At",
          key: "updated_at",
          type: "datetime",
          ui: "text",
        },
      ],
    },
    {
      name: "orders",
      columns: [
        { label: "ID", key: "id", type: "integer", ui: "text" },
        { label: "User ID", key: "user_id", type: "integer", ui: "select" },
        {
          label: "Total Amount",
          key: "total_amount",
          type: "decimal",
          ui: "text",
        },
        {
          label: "Status",
          key: "status",
          type: "string",
          ui: "radio",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" },
          ],
        },
        {
          label: "Created At",
          key: "created_at",
          type: "datetime",
          ui: "text",
        },
        {
          label: "Updated At",
          key: "updated_at",
          type: "datetime",
          ui: "text",
        },
      ],
    },
    {
      name: "order_items",
      columns: [
        { label: "ID", key: "id", type: "integer", ui: "text" },
        { label: "Order ID", key: "order_id", type: "integer", ui: "select" },
        {
          label: "Product ID",
          key: "product_id",
          type: "integer",
          ui: "select",
        },
        { label: "Quantity", key: "quantity", type: "integer", ui: "text" },
        { label: "Price", key: "price", type: "decimal", ui: "text" },
        {
          label: "Created At",
          key: "created_at",
          type: "datetime",
          ui: "text",
        },
        {
          label: "Updated At",
          key: "updated_at",
          type: "datetime",
          ui: "text",
        },
      ],
    },
    {
      name: "categories",
      columns: [
        { label: "ID", key: "id", type: "integer", ui: "text" },
        { label: "Name", key: "name", type: "string", ui: "text" },
        {
          label: "Description",
          key: "description",
          type: "text",
          ui: "textarea",
        },
        { label: "Parent ID", key: "parent_id", type: "integer", ui: "select" },
        {
          label: "Created At",
          key: "created_at",
          type: "datetime",
          ui: "text",
        },
        {
          label: "Updated At",
          key: "updated_at",
          type: "datetime",
          ui: "text",
        },
      ],
    },
  ],
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
