"use client";

import { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useQuery } from "@apollo/client";
import GET_PROFILE from "@/graphql/user/getProfile";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";

export default function Auth() {
  const { data, loading } = useQuery(GET_PROFILE);
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState<boolean>(true);

  if (loading) {
    return <Loader />;
  }

  if (accountCreated) {
    return <LoginForm setAccountCreated={setAccountCreated} />;
  } else {
    return <RegisterForm setAccountCreated={setAccountCreated} />;
  }
}
