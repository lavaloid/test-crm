import { Button, ButtonProps, Icon } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./styles.module.scss";

type Option = { value: string; text: string };

type Props = {
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: Option[];
};

export const Select = (props: Props) => {
  const { value, setValue = () => null, options } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const focusEl = (index: number) => optionsRef.current[index]?.focus();

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowUp") {
      focusEl(options.length - 1);
    }
    if (event.key === "ArrowDown") {
      focusEl(0);
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    item: Option,
    index: number
  ) => {
    if (event.key === "ArrowUp") {
      if (index === 0) focusEl(options.length - 1);
      else focusEl(index - 1);
    }
    if (event.key === "ArrowDown") {
      if (index === options.length - 1) focusEl(0);
      else focusEl(index + 1);
    }
    if (event.key === "Enter") {
      setPopoverOpen(false);
      setValue(item.value);
    }
  };

  const renderItem = (item: Option, index: number) => {
    const selected = item.value === value;

    return (
      <div
        ref={(el) => (optionsRef.current[index] = el)}
        role="option"
        aria-selected={selected}
        tabIndex={popoverOpen ? 0 : -1}
        className={styles.selectItem}
        onClick={() => {
          setValue(item.value);
          setPopoverOpen(false);
        }}
        onKeyDown={(event) => handleOptionKeyDown(event, item, index)}
      >
        {item.text} {selected && <Icon icon="tick" />}
      </div>
    );
  };

  return (
    <Popover2
      interactionKind="click"
      isOpen={popoverOpen}
      onInteraction={(state) => setPopoverOpen(state)}
      onClosed={() => buttonRef.current?.focus()}
      autoFocus={false}
      content={
        <div className={styles.optionContainer}>{options.map(renderItem)}</div>
      }
    >
      <Button
        fill
        role="combobox"
        rightIcon="caret-down"
        elementRef={buttonRef}
        onKeyDown={handleButtonKeyDown}
      >
        {value ? options.find((item) => item.value === value)?.text : "(none)"}
      </Button>
    </Popover2>
  );
};
