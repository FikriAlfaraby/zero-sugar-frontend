'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { LocaleSwitcher } from './LocaleSwitcher';

const Navbar = () => {
  const t = useTranslations('LandingPage');
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${
        isSticky ? 'bg-white shadow-lg' : 'bg-transparent'
      } sticky top-0 z-50 w-full py-4 transition-all duration-500 ease-in-out`}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-8">
        <h1 className="text-2xl font-bold text-blue-600">{t('title')}</h1>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in/" className="text-gray-700 hover:text-gray-900">
            {t('signIn')}
          </Link>
          <Link href="/sign-up/" className="text-gray-700 hover:text-gray-900">
            {t('signUp')}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
