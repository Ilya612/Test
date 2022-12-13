import { useFocusEffect } from "@react-navigation/native";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";
import { useCallback, useState } from "react";

export const useQuizeColorScheme = (
  value: string,
  answerVariant: string | null,
  result: boolean | null
) => {
  const [customScheme, setCustomScheme] = useState<ColorSchemeType>("primary");
  const getColorSchem = () => {
    if (result === null) {
      if (value === answerVariant) {
        setCustomScheme("secondary");
        return;
      }
      setCustomScheme("primary");
      return;
    }
    if (!result && value === answerVariant) {
      setCustomScheme("error");
      return;
    }
    if (result && value === answerVariant) setCustomScheme("success");
  };
  useFocusEffect(
    useCallback(() => {
      getColorSchem();
    }, [answerVariant, result])
  );
  return customScheme;
};
