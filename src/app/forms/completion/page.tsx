"use client"
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Completion: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
        router.push("/dashboard")
    }, 5000)
    
  },[])

  return (
    <div className="p-5 h-screen flex justify-center items-center">
      <div className=" p-10 rounded-sm border border-stroke bg-graydark shadow-default dark:border-strokedark dark:bg-boxdark text-center">
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

        <h2 className="mt-5 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">Pagamento Aprovado</h2>
        
       
      </div>
    </div>
  );
};

export default Completion;
