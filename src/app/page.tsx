"use client";

import { Client, ClientInput, StatusType, useClientDatabase } from "@/data";
import { Button, Card, Classes, Overlay } from "@blueprintjs/core";
import { useMemo, useState } from "react";

import { CreateForm, ListFilters, Table } from "@/components";
import styles from "./page.module.css";

const Page = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const { getMany, insert, loaded } = useClientDatabase();

  const filterFunction = (client: Client) => {
    if (
      statusFilter &&
      statusFilter !== "NONE" &&
      client.status !== statusFilter
    )
      return false;

    if (startDate && startDate > client.dateCreated) return false;
    if (endDate && endDate < client.dateCreated) return false;

    return true;
  };
  const clientData = getMany(filterFunction);

  const onCreate = (data: ClientInput) => insert({ ...data, status: "ACTIVE" });

  return (
    <div>
      <div className={styles.filterContainer}>
        <ListFilters
          {...{
            statusFilter,
            setStatusFilter,
            startDate,
            setStartDate,
            endDate,
            setEndDate,
          }}
        />
      </div>
      <div className={styles.tableHeader}>
        <Button icon="add" intent="primary" onClick={() => setFormOpen(true)}>
          Add Client
        </Button>
        <Overlay
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          className={Classes.OVERLAY_SCROLL_CONTAINER}
        >
          <Card title="Create Client">
            <CreateForm
              onClose={() => setFormOpen(false)}
              onSubmit={onCreate}
            />
          </Card>
        </Overlay>
      </div>
      <Table data={clientData} loaded={loaded} />
    </div>
  );
};

export default Page;
