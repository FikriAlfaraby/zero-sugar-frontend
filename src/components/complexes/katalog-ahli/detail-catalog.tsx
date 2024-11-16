import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { UserCatalog } from "./hooks/fetchCatalog.service";

interface DetailModalProps {
  data: UserCatalog | null;
  onClose: () => void;
}

export function DetailModal({ data, onClose }: DetailModalProps) {
  if (!data) return null;

  return (
    <Dialog open={!!data} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {data.TITLE} {data.NAME}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {data.SPECIALIZATION}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="mb-2">
            <strong>Pengalaman:</strong> {data.EXP_YEARS} tahun
          </p>
          <p className="mb-2">
            <strong>Usia:</strong> {data.AGE} tahun
          </p>
          <p className="mb-2">
            <strong>NIDN:</strong> {data.NIDN}
          </p>
          {data.IS_VERIFIED && (
            <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
              Terverifikasi
            </span>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            asChild
          >
            <a
              href={`https://wa.me/${data.WHATSAPP}?text=${encodeURIComponent(
                `Halo ${data.TITLE} ${data.NAME}, saya melihat profil Anda di Katalog Ahli dan ingin berdiskusi lebih lanjut mengenai ${data.SPECIALIZATION}. Apakah Anda tersedia?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi via WhatsApp
            </a>
          </Button>
          <Button onClick={onClose} variant="secondary">
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
