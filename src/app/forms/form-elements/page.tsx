"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormLayout from "../form-layout/page";

const stripePromise = loadStripe(
  "pk_test_51OXpnxGHBUupE9gqMpc0Q5JvIuOYRAOs5HacId6Y5ROtvvjY2LUCxQRE5XPPoVD4RSsPCANbMiiyvXQYVFPthm6u00TrjxVN0k",
);

const FormElementsPage = () => {
  const searchParams = useSearchParams();
  const client = searchParams.get("client");
  const [clientSecret, setClientSecret] = useState("");

  let client_secret;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    client_secret = client ? client : "";
    /*options = {
      client_secret,
      theme: 'stripe',
    };*/
    setClientSecret(client_secret);
  }, []);

  return (
    <div className="p-5">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <FormLayout />
        </Elements>
      )}
    </div>
  );
};

export default FormElementsPage;
