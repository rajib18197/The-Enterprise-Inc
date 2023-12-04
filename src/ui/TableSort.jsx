import { Fragment, useState } from "react";

export default function TableSort() {
  const fruit = [
    { name: "Orange", color: "orange", count: 5 },
    { name: "Pine-apple", color: "green", count: 3 },
    { name: "Banana", color: "yellow", count: 4 },
    { name: "Apple", color: "red", count: 6 },
  ];

  const config = [
    {
      label: "Name",
      render: (fruit) => fruit.name,
      sortValue: (fruit) => fruit.name,
    },
    { label: "Color", render: (fruit) => fruit.color },
    {
      label: "Count",
      render: (fruit) => fruit.count,
      sortValue: (fruit) => fruit.count,
    },
  ];

  const rowKeyFn = (fruit) => fruit.name;

  return (
    <div>
      <SortableTable data={fruit} config={config} keyFn={rowKeyFn} />
    </div>
  );
}

function SortableTable(props) {
  const { data, config } = props;
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const updatedConfig = config.map((column) => {
    if (column.sortValue) {
      return {
        ...column,
        header: () => (
          <th onClick={() => handleSort(column.label)}>{column.label}</th>
        ),
      };
    }

    return { ...column };
  });

  let sortedData = data;

  if (sortOrder && sortBy) {
    const sortedConfig = config.find(
      (col) => col.label === sortBy && col.sortValue
    );
    sortedData = [...data].sort((a, b) => {
      const valueA = sortedConfig.sortValue(a);
      const valueB = sortedConfig.sortValue(b);

      const modifier = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * modifier;
      }

      if (typeof valueA === "number") {
        return (valueA - valueB) * modifier;
      }
    });
  }

  function handleSort(label) {
    console.log(sortBy, label);
    if (sortBy && sortBy !== label) {
      setSortOrder("asc");
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortBy(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortBy(label);
    } else if (sortOrder === "desc") {
      setSortOrder(null);
      setSortBy(null);
    }
  }

  return (
    <div>
      <p>
        {sortOrder} - {sortBy}
      </p>
      <Table {...props} config={updatedConfig} data={sortedData} />
    </div>
  );
}

function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.lable}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  return (
    <table>
      <thead>
        <tr>
          {/* Inside built in HTML we can not put array but only string */}
          {/* <Headers /> We can't do this if we declare renderedHeaders like this 'Header'  */}
          {renderedHeaders}
        </tr>
      </thead>

      <tbody>
        {data.map((rowData) => (
          <tr key={keyFn(rowData)}>
            {config.map((cell) => (
              <td key={cell.label}>{cell.render(rowData)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
