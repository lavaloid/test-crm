import { useState } from "react";
import { HTMLTable } from "@blueprintjs/core";

import { Client } from "@/data";
import styles from "./styles.module.scss";
import { Loading } from "../Loading";
import { Pagination } from "./Pagination";

type Props = {
  data: Client[];
  loaded: boolean;
};

export const Table = (props: Props) => {
  const { data, loaded } = props;

  const PAGE_SIZE = 20;
  const [activePage, setActivePage] = useState<number>(0);
  const pageCount = Math.ceil(data.length / PAGE_SIZE);

  const renderBody = () => {
    if (!loaded) {
      return (
        <tr>
          <td colSpan={3}>
            <Loading className={styles.loading} />
          </td>
        </tr>
      );
    }
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={3}>No clients yet.</td>
        </tr>
      );
    }
    return data
      .slice(activePage * PAGE_SIZE, (activePage + 1) * PAGE_SIZE)
      .map((value) => (
        <tr key={value.id}>
          <td className={styles.nameCell}>{value.name}</td>
          <td className={styles.contactCell}>{value.contact}</td>
          <td className={styles.actionCell}>Details</td>
        </tr>
      ));
  };

  return (
    <div className={styles.dataContainer}>
      <div className={styles.tableContainer}>
        <HTMLTable className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </HTMLTable>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};
