import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.string().refine(val => !Number.isNaN(Number.parseInt(val)), { message: 'Age must be a number.' }),
  gender: z.string(),
  phoneNumber: z.string().regex(/^\d+$/, { message: 'Phone number must contain only digits.' }),
  weight: z.string().refine(val => !Number.isNaN(Number.parseFloat(val)), { message: 'Weight must be a number.' }),
  height: z.string().refine(val => !Number.isNaN(Number.parseFloat(val)), { message: 'Height must be a number.' }),
  isDiabetes: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  onSubmit: (data: ProfileFormValues) => void;
  isLoading: boolean;
};

export function ProfileForm({ onSubmit, isLoading }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      phoneNumber: '',
      weight: '',
      height: '',
      isDiabetes: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your age in years" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter a valid phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter weight in kilograms" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter height in centimeters" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDiabetes"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Diabetes</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </Form>
  );
}
