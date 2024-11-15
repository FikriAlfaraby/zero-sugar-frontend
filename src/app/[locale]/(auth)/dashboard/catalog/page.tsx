import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

import Home from '@/components/complexes/katalog-ahli/katalog-ahli';

const page = async () => {
  const user = await currentUser();

  return (
    <Home />
  );
};

export default page;
