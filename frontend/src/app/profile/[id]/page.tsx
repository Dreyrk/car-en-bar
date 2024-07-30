"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import UserBox from "@/components/user/UserBox";
import { useGetProfileQuery, useSendConfirmMailMutation } from "@/graphql/generated/schema";
import { SectionItem, UserType } from "@/types";
import { ProfileSectionProps } from "@/types/props";
import { CircleCheck, CircleX, Ellipsis, PlusCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const sections: (id: number) => ProfileSectionProps[] = (id) => {
  return [
    {
      title: "Vehicules",
      id: "profile_vehicules",
      items: [
        {
          text: "Add a vehicule",
          icon: true,
          link: `/profile/${id}/vehicule/new`,
        },
      ],
    },
  ];
};

export default function Page({ params: { id } }: { params: { id: number } }) {
  const { data, loading, error } = useGetProfileQuery();
  const [sendConfirmMail] = useSendConfirmMailMutation();
  const currentProfile = data?.getProfile;
  const [emailSent, setEmailSent] = useState<Date | undefined>(currentProfile?.confirm_email_sent);

  if (!currentProfile) {
    redirect("/");
  }

  const confirmEmail = async () => {
    if (currentProfile?.id) {
      try {
        if (!emailSent) {
          await sendConfirmMail({ variables: { id: currentProfile.id } });
          setEmailSent(new Date());
        }
      } catch (e) {
        throw new Error(`Something wrong with sendConfirmMail: ${(e as Error).message}`);
      }
    } else {
      throw new Error("User not logged");
    }
  };

  if (loading) {
    return (
      <main>
        <Loader size={60} />
      </main>
    );
  }
  return (
    <main>
      <h1 className="text-xl text-center font-semibold py-4">Your Profile</h1>
      <div className="space-y-4 px-2">
        <UserBox user={currentProfile as UserType} />
        <Button
          className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
          variant={"ghost"}>
          <PlusCircle size={30} />
          <span className="text-lg max-md:text-sm whitespace-nowrap hover:animate-scroll-text">Add profile pic</span>
        </Button>
        <Button
          className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
          variant={"ghost"}>
          <span className="text-lg max-md:text-sm whitespace-nowrap hover:animate-scroll-text">
            Modify personnal informations
          </span>
        </Button>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <div className="space-y-4 px-2">
        <h2 className="font-semibold text-lg">Verify your profile</h2>
        {emailSent ? (
          <Button
            className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
            variant={"ghost"}>
            <EmailConfirmed confirmedEmail={currentProfile.confirmed_email} emailSent={emailSent} />
            <span className="text-lg max-md:text-sm whitespace-nowrap">{currentProfile.email}</span>
          </Button>
        ) : (
          <Button
            onClick={confirmEmail}
            className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
            variant={"ghost"}>
            <PlusCircle size={30} />
            <span className="text-lg max-md:text-sm whitespace-nowrap">
              Confirm email address{" "}
              <span className="italic text-ghost font-light max-sm:hidden">({currentProfile?.email})</span>
            </span>
          </Button>
        )}
      </div>
      <Separator orientation="horizontal" className="my-4" />
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </main>
  );
}

export function Section({ title, items, id }: ProfileSectionProps) {
  return (
    <section id={id}>
      <div className="space-y-4 px-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        {items.map(({ text, icon, link }, i) =>
          link ? (
            <Link key={`${id}_${i}`} href={link} className="w-full h-full">
              <Button
                className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
                variant={"ghost"}>
                {icon && <PlusCircle size={30} />}
                <span className="text-lg max-md:text-sm whitespace-nowrap hover:animate-scroll-text">{text}</span>
              </Button>
            </Link>
          ) : (
            <Button
              key={`${id}_${i}`}
              className="flex justify-start gap-4 text-blue-500 h-full w-full hover:bg-muted rounded-md"
              variant={"ghost"}>
              {icon && <PlusCircle size={30} />}
              <span className="text-lg max-md:text-sm whitespace-nowrap hover:animate-scroll-text">{text}</span>
            </Button>
          )
        )}
      </div>
      <Separator orientation="horizontal" className="my-4" />
    </section>
  );
}

export function EmailConfirmed({
  confirmedEmail,
  emailSent,
}: {
  confirmedEmail: boolean;
  emailSent: Date | undefined;
}) {
  if (!confirmedEmail && !emailSent) {
    return <CircleX size={30} />;
  } else if (emailSent && !confirmedEmail) {
    return <Ellipsis size={30} />;
  } else {
    return <CircleCheck size={30} />;
  }
}
