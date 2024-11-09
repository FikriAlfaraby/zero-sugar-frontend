import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  sugarIntake: z.number().min(0).max(500),
  drinkConsumption: z.number().min(0).max(10),
  activities: z.number().min(0).max(24),
  hoursOfSleep: z.number().min(0).max(24),
  sleepQuality: z.enum(['Poor', 'Average', 'Good']),
  isSmoking: z.boolean(),
  stressLevel: z.enum(['Low', 'Moderate', 'High']),
  riskProfile: z.enum(['Low', 'Medium', 'High']),
});

export function DailyLogForm({ onSubmit }: { onSubmit: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sugarIntake: 0,
      drinkConsumption: 0,
      activities: 0,
      hoursOfSleep: 0,
      sleepQuality: 'Average',
      isSmoking: false,
      stressLevel: 'Low',
      riskProfile: 'Low',
    },
  });

  function onSubmitForm(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    setIsSubmitted(true);
    toast({
      title: 'Daily log submitted!',
      description: 'Your progress has been updated.',
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="sugarIntake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sugar Intake (g)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="riskProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Profile</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Daily Log</Button>
      </form>
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center rounded-lg bg-white p-8">
            <CheckCircle className="mb-4 size-16 text-green-500" />
            <p className="text-xl font-bold">Daily Log Submitted!</p>
          </div>
        </div>
      )}
    </Form>
  );
}
