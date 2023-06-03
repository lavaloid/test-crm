export type StatusType = "ACTIVE" | "INACTIVE";

export type ClientInput = {
  avatar: string;
  name: string;
  organization: string;
  contact: string;
  assignedUser: string;
};

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
