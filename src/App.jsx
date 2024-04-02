import { person } from "@jsonforms/examples";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";

export default function App() {
  const schema = person.schema;
  const uischema = person.uischema;
  const initialData = person.data;
  console.log(schema, uischema, initialData);
  const [data, setData] = useState(initialData);
  return (
    <>
      <div className="App">
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => setData(data)}
        />
      </div>
    </>
  );
}
