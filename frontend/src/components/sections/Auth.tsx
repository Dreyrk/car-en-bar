"use client";

import { useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useRouter } from "next/navigation";
import Loader from "../ui/loader";
import { useGetProfileQuery } from "@/graphql/generated/schema";

export default function Auth() {
  const { data, loading } = useGetProfileQuery();
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState<boolean>(true);

  useEffect(() => {
    if (data?.getProfile.id) {
      router.push("/");
    }
    return () => {};
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (accountCreated) {
    return <LoginForm setAccountCreated={setAccountCreated} />;
  } else {
    return <RegisterForm setAccountCreated={setAccountCreated} />;
  }
}
