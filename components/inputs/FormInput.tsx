import { ProductForm } from "@/app/createProductScreen";
import { Control, Controller } from "react-hook-form";
import { TextInput } from "react-native";

type InputProps = {
  control: Control<ProductForm>;
  name: keyof ProductForm;
  placeholder: string;
  required: string;
};

export function FormInput({
  control,
  name,
  placeholder,
  required,
}: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required,
      }}
      render={({ field: { value, onChange } }) => (
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-3 text-lg font-jostMedium"
          value={String(value)}
          onChangeText={onChange}
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default FormInput;
