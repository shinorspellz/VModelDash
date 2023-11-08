export interface UserDetails {
  email: string | null;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
  username: string;
}

export interface UserInt {
  token?: string;
  user?: UserDetails;
  statusCode?: number;
}

export enum USER_STATUS {
  UNVERIFIED = "UNVERIFIED",
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
}

export type LoginFunc = (data: {
  username: string;
  password: string;
}) => Promise<UserInt>;
