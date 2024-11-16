'use client';

import { User, Compass, Briefcase } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';

export function Reminders() {
  const reminders = [
    {
      icon: <User className="h-6 w-6 text-green-500" />,
      title: 'Perbarui Profil Anda',
      text: 'Pastikan data diri Anda selalu lengkap dan terbaru agar rekomendasi AI kami lebih akurat dalam memantau kadar gula harian dan profil risiko kesehatan Anda.',
    },
    {
      icon: <Compass className="h-6 w-6 text-blue-500" />,
      title: 'Jelajahi User Journey',
      text: 'Ikuti langkah-langkah yang telah dirancang khusus untuk membantu Anda mencapai tujuan hidup sehat. Lihat perkembangan Anda di Summary Dashboard & Monitoring Hasil.',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-500" />,
      title: 'Konsultasi dengan Ahli',
      text: 'Temukan solusi terbaik untuk kebutuhan kesehatan Anda melalui Katalog Ahli kami. Jangan ragu untuk berdiskusi langsung dengan pakar terpercaya.',
    },
  ];

  return (
    <ScrollArea className="h-[350px] w-full rounded-lg border bg-gray-50 p-5 shadow-sm">
      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border-l-4 border-gray-200 bg-white p-4 shadow hover:shadow-md transition-shadow"
          >
            <div>{reminder.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {reminder.title}
              </h4>
              <p className="mt-1 text-sm text-gray-600">{reminder.text}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
