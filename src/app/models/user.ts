import { UserStatus } from "./user-status";

export interface User {
    id: string;
    createdDate: Date;
    email: string;
    status: UserStatus;
    subscription: string;
    balance: string
    //name: string;
  }