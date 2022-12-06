import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FormField from 'subcomponents/FormField'
import { BsSearch } from "react-icons/bs";
import Modal from './Modal';
import Auth from './Auth';
import { useDispatch, useSelector } from 'react-redux';
import { BiUserCircle } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { deleteCookie } from 'cookies-next';
import { changeUser } from 'redux/slices/user';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();

  const toggleModal = (state, authState) => {
    setShowModal(state)
    setAuthState(authState)
  }

  const logout = () => {
    deleteCookie("token");
    dispatch(changeUser({}));
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return;

  return (
    <header className='py-6'>
      <div className='custom-container flex items-center justify-between'>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="LetREV"
            width={200}
            height={80}
          />
        </Link>
        <nav className='flex gap-6'>
          <div className={`relative rounded-lg overflow-hidden duration-500 ${showSearch ? "w-[320px]" : "w-[50px]"}`}>
            <FormField
              type="search"
              placeholder="Search letrevs..."
            />
            <button
              onClick={() => setShowSearch(prev => !prev)}
              className={`absolute top-0 right-0 px-4 h-full flex items-center text-[18px] duration-200 ${showSearch ? "bg-violet-700 text-white" : "text-violet-700 bg-purple-100"}`}
            >
              <BsSearch />
            </button>
          </div>
          <div className='flex gap-3'>
            {Object.keys(user).length !== 0 ? (
              <>
                <div className='relative'>
                  <button className='flex peer items-center gap-2 text-[18px] px-4 py-2 border-2 border-violet-700 rounded-lg bg-white'>
                    <BiUserCircle className='text-[20px]' />
                    <span>hey, <b>{user.name}</b>!</span>
                  </button>
                  <div className='absolute opacity-0 peer-hover:opacity-100 hover:opacity-100 translate-y-[5px] peer-hover:translate-y-0 hover:translate-y-0 pointer-events-none peer-hover:pointer-events-auto hover:pointer-events-auto duration-200 overflow-hidden top-full flex flex-col bg-white w-full border-2 border-violet-700 rounded-lg'>
                    <button className={`text-violet-800 hover:bg-purple-100 ${profileBtnClassName}`}>
                      <ImProfile />
                      <span>Profile</span>
                    </button>
                    <button
                      className={`text-red-700 hover:bg-red-100 ${profileBtnClassName}`}
                      onClick={logout}
                    >
                      <MdLogout />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
                <Link href="/profile/create" className='styled-btn flex items-center text-[20px] border-2 border-purple-700 px-3 duration-200 text-white hover:text-purple-700 hover:bg-white rounded-lg bg-purple-700'>
                  <AiOutlinePlus />
                </Link>
              </>
            ) : (
              <>
                <button
                  className={getNavBtnClassName(true)}
                  onClick={() => toggleModal(true, true)}
                >Login</button>
                <button
                  className={getNavBtnClassName(false)}
                  onClick={() => toggleModal(true, false)}
                >Get started</button>
              </>
            )}
          </div>
        </nav>
      </div>
      <Modal
        opened={showModal}
        close={() => setShowModal(false)}
      >
        <Auth
          defaultShowLogin={authState}
          onAuthDone={() => setShowModal(false)}
        />
      </Modal>
    </header>
  )
}

const getNavBtnClassName = outlined => `styled-btn px-5 font-bold border-2 border-violet-700 rounded-lg ${outlined ? "bg-white hover:bg-violet-700 hover:text-white" : "bg-violet-700 text-white"}`;
const profileBtnClassName = `flex items-center px-5 py-2 w-full gap-3`
