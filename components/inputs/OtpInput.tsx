import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export default function OtpInput({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  //   const [value, setValue] = useState("");

  return (
    <CodeField
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          className={`w-12 h-14 border rounded-xl justify-center items-center ${
            isFocused ? "border-primary" : "border-gray-300"
          }`}
        >
          <Text className="text-xl font-gilroyBold">
            {symbol || (isFocused ? <Cursor /> : "")}
          </Text>
        </View>
      )}
    />
  );
}
