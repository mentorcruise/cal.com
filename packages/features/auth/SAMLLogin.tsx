import { signIn } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc/react";
import { Button } from "@calcom/ui";
import { Lock } from "@calcom/ui/components/icon";

interface Props {
  samlTenantID: string;
  samlProductID: string;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export function SAMLLogin({ samlTenantID, samlProductID, setErrorMessage }: Props) {
  const { t } = useLocale();
  const methods = useFormContext();

  const mutation = trpc.viewer.public.samlTenantProduct.useMutation({
    onSuccess: async (data) => {
      await signIn("saml", {}, { tenant: data.tenant, product: data.product });
    },
    onError: (err) => {
      setErrorMessage(t(err.message));
    },
  });

  return (
    <Button
      StartIcon={Lock}
      color="secondary"
      data-testid="saml"
      className="flex w-full justify-center"
      onClick={async (event) => {
        event.preventDefault();

        // open https://mentorcruise.com/widgets/cal/

        window.location.href = `https://mentorcruise.com/widgets/cal/`;
      }}>
      Sign in with MentorCruise
    </Button>
  );
}
