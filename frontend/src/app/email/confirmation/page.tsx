"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useMailConfirmedMutation } from "@/graphql/generated/schema";
import { timeSleep } from "@/utils/timeSleep";
import { CheckCircle, CircleX } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [confirmedEmail] = useMailConfirmedMutation();

  useEffect(() => {
    const getConfirmation = async () =>
      await confirmedEmail({
        variables: { token: token as string },
        onCompleted: (data) => {
          if (!data.confirmMail.success) {
            toast.error(data?.confirmMail.message);
          } else {
            toast.success(data?.confirmMail.message);
            setConfirmed(true);
            timeSleep(3000);
            router.push(`/profile/${data.confirmMail.userId}`);
          }
          setLoading(false);
        },
        onError: (error) => {
          console.error(error.message);
        },
      });
    getConfirmation();
  }, [confirmedEmail, router, token]);

  if (loading) {
    <main className="grid place-content-center">
      <Loader />
    </main>;
  }

  if (!confirmed) {
    return (
      <main className="grid place-content-center">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center justify-center">
              <CircleX size={30} /> <span>Something wrong...</span>
            </CardTitle>
            <CardDescription>Please try again later.</CardDescription>
          </CardHeader>
          <CardContent className="grid place-items-center">
            <Link href="/">
              <Button size={"lg"}>Go to Home Page</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="grid place-content-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center justify-center">
            <CheckCircle className="mx-2" size={30} /> <span>Email Confirmed !</span>
          </CardTitle>
          <CardDescription>You will be redirected automatically.</CardDescription>
        </CardHeader>
        <CardContent className="grid place-items-center">
          <Link href="/">
            <Button size={"lg"}>Go to Home Page</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
