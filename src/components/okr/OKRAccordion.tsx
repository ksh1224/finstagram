import { statusType } from "constant/progress";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import ObjectiveItem from "./ObjectiveItem";

const { IN_PROGRESS, COMPLETE, CANCEL } = statusType;

export default function OKRAccordion({
  objectives,
  user,
  onUpdateOKR,
}: {
  objectives?: any[];
  user?: any;
  onUpdateOKR?: (id: number) => void;
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
        objectives.map((objective: any, objectIndex: number) =>
          objective.status !== CANCEL ? (
            <ObjectiveItem
              key={objective?.id}
              objective={objective}
              objectIndex={objectIndex}
              user={user}
              isOpen={isOpen}
              clickItem={clickItem}
              onUpdateOKR={onUpdateOKR}
            />
          ) : (
            <></>
          )
        )}
    </Accordion>
  );
}
