import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type Page = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
