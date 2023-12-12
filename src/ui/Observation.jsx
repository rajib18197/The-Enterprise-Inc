import { Fragment, useState } from "react";
import styled from "styled-components";
import ObservationBox from "./ObservationBox";
import Button from "./Button";
const StyledObservation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
export default function Observation({ onSetObservations }) {
  const [text, setText] = useState("");

  let reflectText = text.split("\n");
  console.log(reflectText);

  let p = "";

  reflectText.forEach((el, i) => {
    el.slice(-2) === "  " ? (p += `${el.slice(0, -2)}<br />`) : (p += el);
  });

  // console.log(p);

  const HtmlText = p.split("<br />").map((el, i) => (
    <Fragment key={i}>
      {el}
      <br />
    </Fragment>
  ));

  const textEl = p.split("<br />").map((el, i) => `${el}<br />`);
  function handleText(e) {
    console.dir(e.target);
    setText(e.target.value);
  }

  return (
    <StyledObservation>
      <LineBreak text={text} onText={handleText} />
      <ObservationBox text={HtmlText} />
      <Button
        onClick={() => {
          console.log(textEl);
          onSetObservations(textEl.join(""));
        }}
      >
        Save
      </Button>
    </StyledObservation>
  );
}

const TextArea = styled.textarea`
  resize: none;
  border: 2px solid var(--color-brand-600);
  width: 100%;
  height: 15rem;
`;

export function LineBreak({ text, onText }) {
  return (
    <div>
      <TextArea cols="30" rows="10" value={text} onChange={onText}></TextArea>
    </div>
  );
}
