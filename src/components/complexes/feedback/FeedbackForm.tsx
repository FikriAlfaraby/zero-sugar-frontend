"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import {  toast } from "@/hooks/use-toast";

import { z } from "zod";

export const feedbackSchema = z.object({
  rating: z
    .number({ invalid_type_error: "Rating harus berupa angka." })
    .min(1, "Rating harus minimal 1.")
    .max(5, "Rating maksimal 5."),
  category: z.string().nonempty("Kategori tidak boleh kosong."),
  feedback: z.string().nonempty("Feedback tidak boleh kosong."),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;


export default function FeedbackForm({ userId }: { userId: number }) {

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 1,
      category: "",
      feedback: "",
    },
  });

  // Mutation untuk POST feedback
  const mutation = useMutation({
    mutationFn: async (data: FeedbackFormValues) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to save feedback');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Feedback berhasil dikirim!", description : "Terimakasih Atas Masukan Anda 😊" });
      reset();
    },
    onError: (error: any) => {
      toast({ title: "Gagal mengirim feedback.", description: error.message });
    },
  });

  const onSubmit = (data: FeedbackFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="block text-sm font-medium">Rating</label>
        <Input
          type="number"
          min="1"
          max="5"
          {...register("rating", { valueAsNumber: true })}
          className="mt-1"
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <Select
          onValueChange={(value) =>
            setValue("category", value, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <span>{getValues("category") || "Pilih kategori"}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Service">Service</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Feedback */}
      <div>
        <label className="block text-sm font-medium">Feedback</label>
        <Textarea
          {...register("feedback")}
          className="mt-1"
          rows={4}
        />
        {errors.feedback && (
          <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
        )}
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Mengirim..." : "Kirim"}
      </Button>
    </form>
  );
}
