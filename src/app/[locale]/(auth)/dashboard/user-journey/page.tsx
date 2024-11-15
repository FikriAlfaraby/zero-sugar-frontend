import { currentUser } from '@clerk/nextjs/server';

import OnboardingFlow from '@/components/complexes/user-journey/on-boarding/on-boarding-flow';

const page = async () => {
  const user = await currentUser();

  return (
    <OnboardingFlow userId={user?.publicMetadata.id_user as number} />
  );
};

export default page;
