import { unstable_setRequestLocale } from 'next-intl/server';

export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      {props.children}
    </>
  );
}
