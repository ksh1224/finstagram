import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import ObjectiveItem from "./ObjectiveItem";

export default function OKRAccordion({
  objectives,
  user,
}: {
  objectives?: any[];
  user?: any;
}) {
  const [openIndex, setOpenIndex] = useState(-1);

  const isOpen = (index: number) => openIndex === index;

  const clickItem = (index: number) => {
    if (openIndex !== index) setOpenIndex(index);
    else setOpenIndex(-1);
  };

  return (
    <Accordion className="mb-10">
      {objectives &&
        objectives.map((objective: any, objectIndex: number) => (
          <ObjectiveItem
            key={objective?.id}
            objective={objective}
            objectIndex={objectIndex}
            user={user}
            isOpen={isOpen}
            clickItem={clickItem}
          />
        ))}
    </Accordion>
  );
}
