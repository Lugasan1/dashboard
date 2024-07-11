"use client";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Completion: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 5000);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center p-5">
      <div className=" rounded-sm border border-stroke bg-graydark p-10 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
        {/*<Link className="mb-5.5 inline-block" href="/">
          <Image
            className="hidden dark:block"
            src={"/images/logo/logo.png"}
            alt="Logo"
            width={176}
            height={32}
          />
          <Image
            className="dark:hidden"
            src={"/images/logo/logo.png"}
            alt="Logo"
            width={176}
            height={32}
          />
  </Link>*/}

        <span className="inline-block">
          <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#6EE7B7" />
        </span>

        <h2 className="mt-5 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
          Pagamento Aprovado
        </h2>
      </div>
    </div>
  );
};

export default Completion;
