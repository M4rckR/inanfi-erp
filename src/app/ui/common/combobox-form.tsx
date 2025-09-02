'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useState } from 'react';

interface Props<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  data: Array<{ label: string; value: string | number }>;
  className?: string;
}

export function ComboboxForm<T extends Record<string, unknown>>({
                                                                  form,
                                                                  name,
                                                                  label,
                                                                  description,
                                                                  placeholder,
                                                                  data,
                                                                  className
                                                                }: Props<T>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label || String(name)}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'justify-between bg-white',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? data.find(
                      (item) => item.value === field.value
                    )?.label
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>
                    Sin resultados.
                  </CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          form.setValue(name, item.value as PathValue<T, Path<T>>);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            item.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}