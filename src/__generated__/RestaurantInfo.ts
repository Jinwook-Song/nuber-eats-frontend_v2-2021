/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: RestaurantInfo
// ====================================================

export interface RestaurantInfo_restaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface RestaurantInfo_restaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: RestaurantInfo_restaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface RestaurantInfo_restaurant {
  __typename: "RestaurantOutput";
  error: string | null;
  ok: boolean;
  restaurant: RestaurantInfo_restaurant_restaurant | null;
}

export interface RestaurantInfo {
  restaurant: RestaurantInfo_restaurant;
}

export interface RestaurantInfoVariables {
  input: RestaurantInput;
}
