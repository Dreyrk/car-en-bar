import { AllCarpoolsQuery, AllCarpoolsQueryVariables } from "@/graphql/generated/schema";
import { FetchResult } from "@apollo/client";
import { ReactElement } from "react";
import { SectionItem } from ".";

export type InfoCardProps = {
  title: string;
  icon: ReactElement;
  description: string;
};

export type FilterBarProps = {
  refetch: (variables?: AllCarpoolsQueryVariables) => Promise<FetchResult<AllCarpoolsQuery>>;
};

export type ProfileSectionProps = { title: string; items: SectionItem[]; id: string };
