import { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFormProps<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string | number;
  className?: string;
}

export function InputForm<T extends Record<string, unknown>>({
  form,
  name,
  label,
  description,
  placeholder = "",
  type = "string",
  className,
}: InputFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label || String(name)}</FormLabel>
          <FormControl>
            <Input
              type={type === "number" ? "number" : type}
              placeholder={placeholder}
              value={String(field.value ?? "")}
              onChange={(e) => {
                const inputValue = e.target.value;

                if (type === "number") {
                  // La propiedad `type="number"` del input ya previene la entrada de la mayoría
                  // de caracteres no numéricos. Solo necesitamos manejar la conversión
                  // y los casos de string vacío.
                  const numValue = Number(inputValue);
                  if (inputValue === "" || isNaN(numValue)) {
                    field.onChange(null); // Pasa null para campos vacíos o no válidos
                  } else {
                    field.onChange(numValue); // Convierte el valor a número
                  }
                } else {
                  // Para strings, simplemente pasa el valor directamente
                  field.onChange(inputValue);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
