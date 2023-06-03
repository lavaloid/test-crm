import styles from "./styles.module.scss";
import { Select } from "../Select";
import { FormGroup, Icon } from "@blueprintjs/core";
import { DatePicker } from "./DatePicker";
import { Dispatch, SetStateAction } from "react";

type Props = {
  statusFilter?: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  startDate?: Date;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate?: Date;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
};

export const ListFilters = (props: Props) => {
  const {
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  return (
    <div className={styles.filterContainer}>
      <FormGroup label="Created at" contentClassName={styles.datePickerContainer}>
        <DatePicker date={startDate} setDate={setStartDate} />
        <Icon icon="arrow-right" />
        <DatePicker date={endDate} setDate={setEndDate} />
      </FormGroup>
      <FormGroup label="Status">
        <Select
          value={statusFilter}
          setValue={setStatusFilter}
          options={[
            { value: "NONE", text: "(none)" },
            { value: "ACTIVE", text: "Active" },
            { value: "INACTIVE", text: "Inactive" },
          ]}
        />
      </FormGroup>
    </div>
  );
};
