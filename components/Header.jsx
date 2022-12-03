import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import FormField from 'subcomponents/FormField'
import { BsSearch } from "react-icons/bs";
import Modal from './Modal';
import Auth from './Auth';

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [authState, setAuthState] = useState(false);

  const toggleModal = (state, authState) => {
    setShowModal(state)
    setAuthState(authState)
  }

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
            <button
              className={getNavBtnClassName(true)}
              onClick={() => toggleModal(true, true)}
            >Login</button>
            <button
              className={getNavBtnClassName(false)}
              onClick={() => toggleModal(true, false)}
            >Get started</button>
          </div>
        </nav>
      </div>
      <Modal
        opened={showModal}
        close={() => setShowModal(false)}
      >
        <Auth defaultShowLogin={authState} />
      </Modal>
    </header>
  )
}

const getNavBtnClassName = outlined => `styled-btn px-5 font-bold border-2 border-violet-700 rounded-lg ${outlined ? "bg-white hover:bg-violet-700 hover:text-white" : "bg-violet-700 text-white"}`;

