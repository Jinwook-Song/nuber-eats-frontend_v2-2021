import { gql, useQuery } from "@apollo/client";
import { MyProfileQuery } from "../__generated__/MyProfileQuery";

const MY_PROFILE_QUERY = gql`
  query MyProfileQuery {
    myProfile {
      id
      email
      role
      verified
    }
  }
`;

function useMyProfile() {
  return useQuery<MyProfileQuery>(MY_PROFILE_QUERY);
}

export default useMyProfile;
