import { useEffect, useState } from "react";

import { getClientList, saveClientList } from "./local-storage";
import { Client, ClientInfo } from "./types";

export const useClientDatabase = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (loaded) {
      saveClientList(clients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clients]);

  // prevent nextjs hydration error
  useEffect(() => {
    const clientList = getClientList();
    if (!clientList) {
      setError(true);
      return;
    }
    setClients(clientList || []);
    setLoaded(true);
  }, []);

  // Export functions

  /**
   * Get one client based on ID.
   * @param id The ID of the client
   * @returns Client data if found, null otherwise
   */
  const getOne: (id: string) => Client | null = (id) => {
    const result = clients.find((value) => value.id === id);
    if (result) return result;
    else return null;
  };

  /**
   * Get all clients satisfying filter function.
   * @param filter The filter function, which given a Client object
   *    returns `true` if it satisfies the condition, `false` otherwise.
   * @returns Array of clients found.
   */
  const getMany: (filter?: (item: Client) => boolean) => Client[] = (
    filter
  ) => {
    if (!filter) return clients;

    return clients.filter(filter);
  };

  /**
   * Inserts the new client into the database.
   * @param data Data for the new client.
   * @returns The new client.
   */
  const insert: (data: ClientInfo) => Client | null = (data) => {
    const dateCreated = new Date();
    const newId = dateCreated.getTime().toString();

    const newClient: Client = {
      ...data,
      id: newId,
      dateCreated,
    };

    // We want data to be sorted descending based on date created
    setClients((data) => [newClient, ...data]);
    return newClient;
  };

  /**
   * Update the data for a client based on ID.
   * @param id The ID of the client to update.
   * @param update New data to replace old client data.
   * @returns the new Client object if client exists, `null` otherwise
   */
  const update: (id: string, update: Partial<ClientInfo>) => Client | null = (
    id,
    update
  ) => {
    const clientIdx = clients.findIndex((val) => val.id === id);
    if (clientIdx < 0) return null;

    const newClient = Object.assign({}, clients[clientIdx], update);
    setClients((data) => {
      const newData = data.slice();
      newData.splice(clientIdx, 1, newClient);
      return newData;
    });

    return newClient;
  };

  return { clients, loaded, error, getOne, getMany, insert, update };
};
