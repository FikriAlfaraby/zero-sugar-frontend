import { currentUser } from '@clerk/nextjs/server';

import UserJourney from '@/components/complexes/user-journey/user-journey';

const page = async () => {
  const user = await currentUser();

  console.log(user);

  return (
    <UserJourney />
  );
};

export default page;
