import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

import styles from "./styles.module.scss";

type Props = {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
};

export const DatePicker = (props: Props) => {
  const { date, setDate } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  return (
    <div className={styles.dateContainer}>
      <Popover2
        interactionKind="click"
        isOpen={popoverOpen}
        onInteraction={(state) => setPopoverOpen(state)}
        onClosed={() => buttonRef.current?.focus()}
        autoFocus={false}
        content={
          <Calendar
            onChange={(value) => {
              setDate?.(value as Date);
              setPopoverOpen(false);
              buttonRef.current?.focus();
            }}
          />
        }
      >
        <Button fill role="" icon="calendar" elementRef={buttonRef}>
          {date ? dayjs(date).format("YYYY/MM/DD") : "YYYY/MM/DD"}
        </Button>
      </Popover2>
      <Button
        icon="cross-circle"
        disabled={!date}
        onClick={() => setDate(null)}
      />
    </div>
  );
};
