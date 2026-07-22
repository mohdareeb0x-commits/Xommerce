import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

type NumericControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
} & TextInputProps;

export function FormInputNumeric<T extends FieldValues>({
  control,
  name,
  ...props
}: NumericControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <TextInput
          className="border border-gray-300 rounded-xl px-5 py-3 text-lg font-jostMedium"
          {...props}
          keyboardType="numeric"
          value={value?.toString() ?? ""}
          onChangeText={(text) => {
            const number = text === "" ? 0 : Number(text);

            onChange(number);
          }}
        />
      )}
    />
  );
}
