'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  sugar: z.number().min(0).max(1000),
  drink_consumption: z.number().min(0).max(1000),
  activities: z.number().min(0).max(24),
  hours_sleep: z.number().min(0).max(24),
  sleep_quality: z.enum(['Good', 'Average', 'Poor']),
  is_smoking: z.boolean(),
  stress_level: z.enum(['Low', 'Medium', 'High']),
  risk_profile: z.enum(['Low', 'Moderate', 'High']),
});

export default function SugarIntakeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sugar: 0,
      drink_consumption: 0,
      activities: 0,
      hours_sleep: 0,
      sleep_quality: 'Average',
      is_smoking: false,
      stress_level: 'Medium',
      risk_profile: 'Moderate',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sugar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sugar Intake (grams)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the amount of sugar consumed in grams.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drink_consumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sugary Drink Consumption (ml)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the amount of sugary drinks consumed in milliliters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Activities (hours)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the number of hours spent on physical activities.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours_sleep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours of Sleep</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the number of hours you slept.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sleep_quality"
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
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Average">Average</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select the quality of your sleep.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_smoking"
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
          name="stress_level"
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
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select your stress level for today.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="risk_profile"
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
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select your risk profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
