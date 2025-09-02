'use client';

import { useState } from 'react';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  data: Array<{ label: string; value: string | number }>;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  valueType?: 'string' | 'number';
  type?: 'select' | 'combobox';
}

export function SelectCombobox<T extends Record<string, unknown>>({
  form,
  name,
  label,
  description,
  placeholder,
  data,
  className,
  disabled = false,
  valueType = 'string',
  type = 'combobox',
}: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label || String(name)}</FormLabel>

          {type === 'select' ? (
            <Select
              onValueChange={(val) => {
                if (disabled) return;
                const processedValue = (val === "") ? null : (valueType === 'number' ? Number(val) : val);
                field.onChange(processedValue);
              }}
              value={String(field.value) || ''}
              disabled={disabled}
            >
              <FormControl className="w-full bg-neutral-50">
                <SelectTrigger
                  className={cn(
                    "bg-neutral-50",
                    disabled && "bg-gray-100 cursor-not-allowed opacity-100"
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Popover open={open && !disabled} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                      'justify-between bg-white',
                      !field.value && 'text-muted-foreground',
                      disabled && "bg-gray-100 cursor-not-allowed opacity-100"
                    )}
                  >
                    {field.value
                      ? data.find((item) => item.value === field.value)?.label
                      : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>Sin resultados.</CommandEmpty>
                    <CommandGroup>
                      {data.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={String(item.label)} 
                          onSelect={() => {
                            form.setValue(name, (valueType === 'number' ? Number(item.value) : item.value) as PathValue<T, Path<T>>);
                            setOpen(false);
                          }}
                        >
                          {item.label}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              item.value === field.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
