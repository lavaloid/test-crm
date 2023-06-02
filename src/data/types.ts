export type StatusType = "ACTIVE" | "INACTIVE";

export type ClientInfo = {
  contact: string;
  name: string;
  avatar?: string;
  organization?: string;
  status: StatusType;
  assignedUser: string;
};

export type Client = ClientInfo & {
  id: string;
  dateCreated: Date;
};
