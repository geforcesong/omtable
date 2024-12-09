import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessUpdateFormSchema } from "@/schemas/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import OmButton from "@/components/ui/OmButton";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useBatchUpdateBusinesses } from "@/client/hooks/useBatchUpdateBusinesses";

type Props = {
  open: boolean;
  ids: string[];
  onClose?: () => void;
};

const defaultValues = {
  url: "",
  retailer_name: "",
  location: "",
  count: 0,
};

export const BatchUpdateForm: React.FC<Props> = ({ ids, open, onClose }) => {
  const form = useForm<z.infer<typeof BusinessUpdateFormSchema>>({
    resolver: zodResolver(BusinessUpdateFormSchema),
    defaultValues,
  });

  const { mutate: updateBusinesses, isPending } = useBatchUpdateBusinesses({
    onSuccess: () => {
      onClose?.();
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [open]);

  function onSubmit(values: z.infer<typeof BusinessUpdateFormSchema>) {
    updateBusinesses({
      ids,
      businessData: values,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Batch Update - {ids.length} businesses</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retailer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retailer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Count</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <OmButton type="submit" loading={isPending}>
                Submit
              </OmButton>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
