import { UserStatus } from "./user-status";

export interface User {
    id: string;
    createdDate: Date;
    status: UserStatus;
    //name: string;
  }