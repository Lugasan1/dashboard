"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CardElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import FormLayout from "../form-layout/page";

const stripePromise = loadStripe("pk_test_51OXpnxGHBUupE9gqMpc0Q5JvIuOYRAOs5HacId6Y5ROtvvjY2LUCxQRE5XPPoVD4RSsPCANbMiiyvXQYVFPthm6u00TrjxVN0k");

const FormElementsPage = () => {
  const searchParams = useSearchParams();
  const client = searchParams.get("client");
  const [clientSecret, setClientSecret] = useState("");

  let client_secret
  useEffect(() => {
  client_secret = client ? client : ""
    /*options = {
      client_secret,
      theme: 'stripe',
    };*/
    setClientSecret(client_secret);
  }, []);


  return (
    <div className="p-5">
       {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
        <FormLayout />
      </Elements>
        )}
    </div>
  );
};

export default FormElementsPage;
