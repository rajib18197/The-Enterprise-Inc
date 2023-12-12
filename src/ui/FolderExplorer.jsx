import { useState } from "react";
import Input from "./Input";
import Error from "./Error";

const data = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "education",
      isFolder: true,
      items: [
        { name: "just.js", isFolder: false },
        {
          name: "books",
          isFolder: true,
          items: [
            { name: "closure.js", isFolder: false },
            { name: "ref.js", isFolder: false },
            { name: "redux.js", isFolder: false },
          ],
        },
      ],
    },
    //
    {
      name: "money",
      isFolder: true,
      items: [
        {
          name: "banks",
          isFolder: true,
          items: [
            { name: "sell.js", isFolder: false },
            { name: "communication.js", isFolder: false },
            { name: "value.js", isFolder: false },
          ],
        },
      ],
    },
  ],
};

export default function FolderExplorer() {
  const [explorer, setExplorer] = useState(data);
  return (
    <div>
      <Folder data={explorer} />
    </div>
  );
}

function Folder({ data }) {
  //   console.log(data);
  const [value, setValue] = useState("");
  const [expand, setExpand] = useState(false);
  const [hasShowInput, setHasShowInput] = useState(false);
  const [error, setError] = useState({});

  function handleClick(e) {
    // setHasShowInput((cur) => !cur);
    setHasShowInput(true);
    setExpand(true);
    console.log(e.target);
  }

  function handleExpand() {
    console.log(2);
    setExpand((exp) => !exp);
  }

  function handleKey(e) {
    if (e.key === "Enter" && value.length === 0) {
      setError({ message: "must provide file or folder name" });
      return;
    }
    setError({});
    console.log(333);
  }
  console.log(hasShowInput, expand, data.name);
  return (
    <div>
      {data.isFolder ? (
        <>
          <div
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            onClick={handleExpand}
          >
            <h2>{data.name}</h2>
            <div>
              <button
                onClick={(e) => {
                  console.log(e.target);
                  e.stopPropagation();
                  handleClick(e, "folder");
                }}
              >
                +folder
              </button>
              <button onClick={(e) => handleClick(e, "file")}>+file</button>
            </div>
          </div>

          {expand && (
            <div style={{ paddingLeft: "2rem" }}>
              {hasShowInput && (
                <Input
                  value={value}
                  onKeyDown={handleKey}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={(e) => {
                    setHasShowInput(false);
                  }}
                  autoFocus
                />
              )}
              {Boolean(error.message) && <Error msg={error.message} />}
              {data.items.map((el) => {
                return <Folder key={el.name} data={el} />;
              })}
            </div>
          )}
        </>
      ) : (
        <div style={{ paddingLeft: "2rem" }}>{data.name}</div>
      )}
    </div>
  );
}
