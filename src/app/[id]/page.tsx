/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@blueprintjs/core";
import { StatusType, useClientDatabase } from "@/data";
import styles from "./page.module.scss";
import { Loading, Select } from "@/components";
import dayjs from "dayjs";
import { placeholderImage } from "./data";

type PageProps = {
  params: { id: string };
};

const Page = ({ params }: PageProps) => {
  const { loaded, error, getOne, update } = useClientDatabase();

  const id = params.id;
  const {
    dateCreated,
    status,
    avatar,
    name,
    organization,
    contact,
    assignedUser,
  } = getOne(id || "") || {};

  if (!loaded) {
    return <Loading className={styles.spinner} />;
  }
  if (error) {
    return <p>An error occured while loading client info.</p>;
  }
  if (!name) {
    return <p>Client not found.</p>;
  }

  return (
    <div>
      <Card className={styles.cardContents}>
        <img
          className={styles.image}
          src={avatar || placeholderImage}
          alt={`Avatar for ${name}`}
        />
        <div>
          <h1 className={styles.clientName}>{name}</h1>
          <h2 className={styles.clientOrganization}>{organization}</h2>
        </div>
      </Card>
      <ul className={styles.details}>
        <li>
          Created at: <span>{dayjs(dateCreated).format("YYYY/MM/DD")}</span>
        </li>
        <li>
          Status:{" "}
          <Select
            value={status}
            setValue={(status) => {
              update(id, { status: status as StatusType });
            }}
            options={[
              { text: "Active", value: "ACTIVE" },
              { text: "Inactive", value: "INACTIVE" },
            ]}
          />
        </li>
        <li>
          Contact: <span>{contact}</span>
        </li>
        <li>
          Assigned to: <span>{assignedUser}</span>
        </li>
      </ul>
    </div>
  );
};

export default Page;
