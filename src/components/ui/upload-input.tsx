import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function UploadInput({ field }: { field: any }) {
  return (
    <FormItem>
      <FormLabel>Upload Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={e => field.onChange(e.target.files)} // Sinkronisasi dengan React Hook Form
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
