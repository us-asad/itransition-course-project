import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import FormField from 'subcomponents/FormField';
import SubmitBtn from 'subcomponents/SubmitBtn';
import { getInputValidations } from 'utils/functions';

export default function Auth({ defaultShowLogin }) {
  const [showLogin, setShowLogin] = useState(defaultShowLogin);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const emailRegisters = register("email", getInputValidations(true, 2, 100));
  const passwordRegisters = register("password", getInputValidations(true, 6, 150));

  const authUser = data => {
    console.log(data);
  }

  useEffect(() => {
    setShowLogin(defaultShowLogin)
  }, [defaultShowLogin]);

  return (
    <div>
      <div className='w-full flex relative'>
        <button
          className={tabClassName}
          onClick={() => setShowLogin(true)}
        >Login</button>
        <button
          className={tabClassName}
          onClick={() => setShowLogin(false)}
        >Register</button>
        <div
          className={`absolute bottom-0 w-1/2 h-0.5 bg-violet-700 duration-200 ${showLogin ? "left-0" : "left-1/2"}`}
        />
      </div>
      <form
        onSubmit={handleSubmit(authUser)}
        className="mt-4 w-[400px] flex flex-col gap-2"
      >
        {showLogin ? (
          <>
            <FormField
              type="email"
              placeholder="yourmail@mail.com"
              label="Email"
              registers={emailRegisters}
              error={errors.email?.message}
            />
            <FormField
              type="password"
              placeholder="xxxxxx"
              label="Password"
              registers={passwordRegisters}
              error={errors.password?.message}
            />
          </>
        ) : (
          <>
            <FormField
              type="text"
              placeholder="John"
              label="Name"
              registers={register("name", getInputValidations(true, 2, 100))}
              error={errors.name?.message}
            />
            <FormField
              type="email"
              placeholder="yourmail@mail.com"
              label="Email"
              registers={emailRegisters}
              error={errors.email?.message}
            />
            <FormField
              type="password"
              placeholder="xxxxxx"
              label="Password"
              registers={passwordRegisters}
              error={errors.password?.message}
            />
          </>
        )}
        <SubmitBtn
          text={showLogin ? "Login" : "Register"}
          loadingText={showLogin ? "Loging in" : "Registering"}
          className="mt-2"
        />
        <div className='relative text-center'>
          <span className='absolute block w-full h-0.5 top-1/2 -translate-y-1/2 left-0 bg-gray-300' />
          <span className='relative bg-white'>or with</span>
        </div>
        <div className='flex gap-2'>
          <button
            type="button"
            className={getSocialBtnClassName()}
          >
            Google
            <Image
              src="/images/google-logo.png"
              alt="Google"
              width={20}
              height={20}
            />
          </button>
          <button
            type="button"
            className={getSocialBtnClassName(true)}
          >
            Facebook
            <Image
              src="/images/facebook-logo.png"
              alt="Facebook"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
    </div>
  )
}

const tabClassName = `w-1/2 py-2 text-[18px] font-bold`
const getSocialBtnClassName = blueBg => `styled-btn w-1/2 py-2 text-[18px] font-bold flex items-center justify-center gap-3 border-2 rounded-full ${blueBg ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200"}`;
