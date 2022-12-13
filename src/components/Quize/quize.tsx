import { View, Text, Button } from "native-base";
import { useQuizeColorScheme } from "../../hooks/useQuizeColorScheme";
import { QuizeData } from "./types";

interface QuizeProps extends QuizeData {
  setAnswer: (text: string) => void;
  result: boolean | null;
  variant: string | null;
}

export const Quize = ({
  title,
  options,
  result,
  variant,
  setAnswer,
}: QuizeProps) => {
  return (
    <>
      <>
        <View>
          <View m={2}>
            <Text fontSize={25} textAlign={"center"}>
              {title}
            </Text>
          </View>
          {options.map((option, index) => (
            <CustomButton
              key={index}
              value={option}
              action={(text) => setAnswer(text)}
              answerVariant={variant}
              result={result}
            />
          ))}
        </View>
      </>
    </>
  );
};
interface CustomButtonProps {
  action: (text: string) => void;
  value: string;
  answerVariant: string | null;
  result: boolean | null;
}
const CustomButton = ({
  action,
  value,
  answerVariant,
  result,
}: CustomButtonProps) => {
  const scheme = useQuizeColorScheme(value, answerVariant, result);
  return (
    <>
      <>
        <Button
          onPress={() => action(value)}
          size={"lg"}
          mb={2}
          w={"100%"}
          colorScheme={scheme}
          variant={"solid"}
        >
          {value}
        </Button>
      </>
    </>
  );
};
