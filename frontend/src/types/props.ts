import { AllCarpoolsQuery, AllCarpoolsQueryVariables } from "@/graphql/generated/schema";
import { FetchResult } from "@apollo/client";
import { ReactElement } from "react";

export type InfoCardProps = {
  title: string;
  icon: ReactElement;
  description: string;
};

export type FilterBarProps = {
  refetch: (variables?: AllCarpoolsQueryVariables) => Promise<FetchResult<AllCarpoolsQuery>>;
};
