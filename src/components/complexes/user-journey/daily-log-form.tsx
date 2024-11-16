import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UploadInput } from '@/components/ui/upload-input';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  drinkConsumption: z.number().min(1).max(10),
  activities: z.number().min(1).max(24),
  hoursOfSleep: z.number().min(1).max(24),
  sleepQuality: z.enum(['Poor', 'Average', 'Good']),
  isSmoking: z.boolean(),
  stressLevel: z.enum(['Low', 'Moderate', 'High']),
  picture: z
    .custom<FileList>(value => value instanceof FileList && value.length > 0, {
      message: 'File is required.',
    })
    .refine(files => Array.isArray(files) && files[0]?.type.startsWith('image/'), {
      message: 'Only image files are allowed.',
    }),
});

type FormSchema = z.infer<typeof formSchema>;

type UserProfile = {
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

export function DailyLogForm({ userId }: { userId: number }) {
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: profileData } = useQuery<UserProfile> ({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drinkConsumption: 0,
      activities: 0,
      hoursOfSleep: 0,
      sleepQuality: 'Average',
      isSmoking: false,
      stressLevel: 'Low',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (journeyData: FormSchema) => {
      const sugarResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/predict_sugar_intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!sugarResponse.ok) {
        throw new Error('Failed to fetch sugar intake prediction');
      }

      const sugar = await sugarResponse.json();

      const userData = {
        Age: Number(profileData?.AGE),
        Gender: profileData?.GENDER === 'male' ? 1 : 0,
        Height: profileData?.HEIGHT,
        Weight: profileData?.WEIGHT,
        Is_Diabetes: profileData?.IS_DIABETES ? 1 : 0,
        BMI: profileData?.BMI,
        Sugar: sugar.predicted_sugar_intake,
        Drink_Consumption: Number.parseFloat(journeyData.drinkConsumption.toString()),
        Activities: Number.parseFloat(journeyData.activities.toString()),
        Sleep_Hours: Number.parseInt(journeyData.hoursOfSleep.toString(), 10),
        Is_Smoking: journeyData.isSmoking ? 1 : 0,
      };

      const profileRiskResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/predict_profile_risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!profileRiskResponse.ok) {
        throw new Error('Failed to fetch profile risk prediction');
      }

      const dataProfileRisk = await profileRiskResponse.json();

      const riskMapping = {
        0: 'Low Risk',
        1: 'Neutral',
        2: 'High Risk',
        3: 'Very High Risk',
      };

const riskProfile = riskMapping[dataProfileRisk.predicted_cluster as keyof typeof riskMapping];

      // Define convertedData with properties in the specified order
      const convertedData = {
        sugar: sugar.predicted_sugar_intake,
        drink_consumption: Number.parseFloat(journeyData.drinkConsumption.toString()),
        activities: Number.parseFloat(journeyData.activities.toString()),
        hours_sleep: Number.parseInt(journeyData.hoursOfSleep.toString(), 10),
        sleep_quality: journeyData.sleepQuality.toLowerCase(),
        is_smoking: journeyData.isSmoking,
        stress_level: journeyData.stressLevel.toLowerCase(),
        risk_profile: riskProfile,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journey/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'User telah mengisi journey hari ini') {
          throw new Error('User telah mengisi journey hari ini');
        }
        throw new Error('Failed to save user journey');
      }

      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setIsSubmitted(true);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['userJourney', userId] });
        setIsSubmitted(false);
      }, 2000);
    },
    onError: (error) => {
      console.error('Error submitting journey data:', error);

      if (error.message === 'User telah mengisi journey hari ini') {
        toast({
          title: 'Jangan Gegabah',
          description: 'Anda sudah mengsubmit hari ini',
        });
      } else {
        console.error('An unexpected error occurred:', error);
      }

      setTimeout(() => setIsSubmitted(false), 2000);
    },
  });

  const onSubmitForm = (data: FormSchema) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="picture"
        render={({ field }) => <UploadInput field={field} />}
      />
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="drinkConsumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drink Consumption (L)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
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
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
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
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
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
                <FormDescription>
                  Did you smoke today?
                </FormDescription>
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Logging...' : 'Submit Daily Log'}
        </Button>
      </form>
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all">
          <div className="flex flex-col items-center rounded-lg bg-white p-8">
            <CheckCircle className="mb-4 size-16 text-green-500" />
            <p className="text-xl font-bold">Daily Log Submitted!</p>
          </div>
        </div>
      )}
    </Form>
  );
}
