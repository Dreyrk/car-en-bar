import { AllCarpoolsQuery, AllCarpoolsQueryVariables } from "@/graphql/generated/schema";
import { FetchResult } from "@apollo/client";
import { ReactElement, InputHTMLAttributes, SetStateAction } from "react";
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

export type FormFieldProps = {
  label: string;
  id: string;
  formId: string;
  state: any;
  setState: React.Dispatch<SetStateAction<any>>;
  placeAutoComplete?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export type StepFormProps = {
  id: string;
  title: string;
  description: string;
  fields: Omit<FormFieldProps, "formId">[];
};
