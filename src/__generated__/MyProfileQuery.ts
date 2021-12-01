/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyProfileQuery
// ====================================================

export interface MyProfileQuery_myProfile {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
}

export interface MyProfileQuery {
  myProfile: MyProfileQuery_myProfile;
}
