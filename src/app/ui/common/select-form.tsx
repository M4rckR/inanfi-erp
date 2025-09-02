'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Path, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface Props<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  data: Array<{ label: string; value: string | number }>;
  className?: string;
  readOnly?: boolean; // <-- Se añade la prop readOnly
  disabled?: boolean;
  valueType?: 'string' | 'number'; // <-- ¡Nueva prop para el tipo de valor!
}

export function SelectForm<T extends Record<string, unknown>>({
                                                                form,
                                                                name,
                                                                label,
                                                                description,
                                                                placeholder,
                                                                data,
                                                                className,
                                                                disabled = false,
                                                             
                                                                valueType = 'string' // <-- Por defecto, asume string (útil para enums)
                                                              }: Props<T>) {
                                                                console.log("Siguiente: ", form.getValues(name)) // Se mantiene tu console.log
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(val) => {
              if (disabled) return;

              // Lógica de conversión basada en valueType
              let processedValue: string | number | null = null;
              if (val === "") {
                processedValue = null; // Si el valor es vacío, lo convierte a null para Zod
              } else if (valueType === 'number') {
                // Si el valor es una cadena vacía pero esperamos un número, también puede ser null
                processedValue = Number(val);
                if (isNaN(processedValue)) { // Manejar el caso donde Number("") da NaN, o Number("") da 0 pero queremos null
                    processedValue = null;
                }
              } else { // valueType === 'string' (o cualquier otro caso, mantiene como string)
                processedValue = val;
              }
              field.onChange(processedValue);
            }}
            // Muestra el placeholder si el valor del campo es null, undefined o 0 (para números no seleccionados)
            value={field.value === null || field.value === undefined || field.value === 0 ? "" : String(field.value)}
            disabled={disabled}  // <-- Deshabilita el Select cuando está en modo solo lectura
          >
            <FormControl className="w-full bg-neutral-50">
              <SelectTrigger 
                className={cn(
                  "bg-neutral-50",
                  disabled && "bg-gray-100 cursor-not-allowed opacity-100" // Estilo para solo lectura
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
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
