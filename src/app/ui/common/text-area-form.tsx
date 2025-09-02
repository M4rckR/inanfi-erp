import { Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface TextAreaFormProps<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  readOnly?: boolean;
}

export function TextAreaForm<T extends Record<string, unknown>>({
                                                               form,
                                                               name,
                                                               label,
                                                               description,
                                                               placeholder = '',
                                                               readOnly = false,
                                                               className,
                                                             }: TextAreaFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label || String(name)}</FormLabel>
          <FormControl>
            <Textarea  placeholder={placeholder} {...field} value={String(field.value)} readOnly={readOnly} />
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}