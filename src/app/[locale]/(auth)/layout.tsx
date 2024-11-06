import { enUS } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

import { AppConfig } from '@/utils/AppConfig';

const idID = {
  signUp: {
    start: {
      title: 'Buat akun Anda',
      subtitle: 'untuk melanjutkan ke {{applicationName}}',
      actionText: 'Sudah punya akun?',
      actionLink: 'Masuk',
    },
    emailLink: {
      title: 'Verifikasi email Anda',
      subtitle: 'untuk melanjutkan ke {{applicationName}}',
      formTitle: 'Tautan verifikasi',
      formSubtitle: 'Gunakan tautan verifikasi yang dikirim ke alamat email Anda',
      resendButton: 'Tidak menerima tautan? Kirim ulang',
      verified: {
        title: 'Berhasil mendaftar',
      },
      loading: {
        title: 'Sedang mendaftar...',
      },
      verifiedSwitchTab: {
        title: 'Email berhasil diverifikasi',
        subtitle: 'Kembali ke tab yang baru dibuka untuk melanjutkan',
        subtitleNewTab: 'Kembali ke tab sebelumnya untuk melanjutkan',
      },
    },
    emailCode: {
      title: 'Verifikasi email Anda',
      subtitle: 'untuk melanjutkan ke {{applicationName}}',
      formTitle: 'Kode verifikasi',
      formSubtitle: 'Masukkan kode verifikasi yang dikirim ke alamat email Anda',
      resendButton: 'Tidak menerima kode? Kirim ulang',
    },
    phoneCode: {
      title: 'Verifikasi nomor telepon Anda',
      subtitle: 'untuk melanjutkan ke {{applicationName}}',
      formTitle: 'Kode verifikasi',
      formSubtitle: 'Masukkan kode verifikasi yang dikirim ke nomor telepon Anda',
      resendButton: 'Tidak menerima kode? Kirim ulang',
    },
    continue: {
      title: 'Lengkapi kolom yang kosong',
      subtitle: 'untuk melanjutkan ke {{applicationName}}',
      actionText: 'Sudah punya akun?',
      actionLink: 'Masuk',
    },
  },
};

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let clerkLocale = enUS;
  let signInUrl = '/sign-in';
  let signUpUrl = '/sign-up';
  let dashboardUrl = '/dashboard';
  let afterSignOutUrl = '/';

  // Atur URL dan bahasa Indonesia jika locale bukan default
  if (props.params.locale !== AppConfig.defaultLocale) {
    signInUrl = `/${props.params.locale}${signInUrl}`;
    signUpUrl = `/${props.params.locale}${signUpUrl}`;
    dashboardUrl = `/${props.params.locale}${dashboardUrl}`;
    afterSignOutUrl = `/${props.params.locale}${afterSignOutUrl}`;

    if (props.params.locale === 'id') {
      clerkLocale = idID;
    }
  }

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
