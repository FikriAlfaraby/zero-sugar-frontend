import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UploadInput } from '@/components/ui/upload-input';

const userJourneySchema = z.object({
  drinkConsumption: z.string().refine(val => !Number.isNaN(Number.parseFloat(val)), { message: 'Drink consumption must be a number.' }),
  activities: z.string().refine(val => !Number.isNaN(Number.parseFloat(val)), { message: 'Activities must be a number.' }),
  hoursOfSleep: z.string().refine(val => !Number.isNaN(Number.parseFloat(val)), { message: 'Hours of sleep must be a number.' }),
  sleepQuality: z.enum(['Poor', 'Average', 'Good']),
  isSmoking: z.boolean(),
  stressLevel: z.enum(['Low', 'Moderate', 'High']),
  picture: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: 'File is required.' })
    .refine((files) => files[0]?.type.startsWith('image/'), {
      message: 'Only image files are allowed.',
    }),
});

export type UserJourneyFormValues = z.infer<typeof userJourneySchema>;

type UserJourneyFormProps = {
  onSubmit: (data: UserJourneyFormValues) => void;
  isLoading: boolean;
};

export type UserProfile = {
  ID_PROFILE: number;
  ID_USER: number;
  NAME: string;
  AGE: string; // Note: Age is a string in the provided data
  GENDER: string;
  PHONE_NUMBER: number; // Consider using string for very large numbers
  WEIGHT: number;
  HEIGHT: number;
  IS_DIABETES: boolean;
  IS_OBESITY: boolean;
  BMI: number;
  IS_ONBOARDING: boolean;
  CREATED_AT: string; // ISO format
  UPDATED_AT: string; // ISO format
};


export function UserJourneyForm({ onSubmit, isLoading}: UserJourneyFormProps) {
  const form = useForm<UserJourneyFormValues>({
    resolver: zodResolver(userJourneySchema),
    defaultValues: {
      drinkConsumption: '',
      activities: '',
      hoursOfSleep: '',
      sleepQuality: 'Average',
      isSmoking: false,
      stressLevel: 'Moderate',
    },
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="picture"
        render={({ field }) => <UploadInput field={field} />}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="drinkConsumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drink Consumption (ml)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter daily drink intake in milliliters" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activities (hours)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter activity duration in hours" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hoursOfSleep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours of Sleep</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter number of hours slept" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sleepQuality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sleep Quality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sleep quality" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Poor">Poor</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSmoking"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Smoking</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stressLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stress Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stress level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging...' : 'Log My Day'}
        </Button>
      </form>
    </Form>
  );
}
