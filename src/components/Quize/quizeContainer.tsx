import { useFocusEffect } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Skeleton,
  useToast,
  View,
  VStack,
  Text,
} from "native-base";
import React, { useCallback, useState } from "react";
import quizeService from "../../services/quize.service";
import { Quize } from "./quize";
import { QuizeData } from "./types";

export const QuizeContainer = () => {
  const [data, setData] = useState<QuizeData[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [variant, setVariant] = useState<null | string>(null);

  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );
  const getData = async () => {
    setIsLoading(true);
    const res = await quizeService.getQuestions();
    setData(res);
    setIsLoading(false);
  };

  const Next = useCallback(() => {
    if (data) {
      if (variant === data[stepNumber]?.answer) {
        setStepNumber((prevState) => ++prevState);
        showSuccess();
        setVariant(null);
        return;
      }
      if (!variant) {
        showError(true);
        return;
      }
      showError();
      setResult(false);
    }
  }, [data, variant]);
  const showSuccess = useCallback(() => {
    toast.show({
      render: () => {
        return (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            <Text color="white">Success</Text>
          </Box>
        );
      },
      duration: 2000,
    });
  }, []);
  const showError = useCallback((isVariantNull?: boolean) => {
    toast.show({
      render: () => {
        return (
          <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
            <Text color={"white"}>
              {isVariantNull ? "Choose one variant" : "Wrong answer"}
            </Text>
          </Box>
        );
      },
      duration: 2000,
    });
  }, []);

  return (
    <>
      <>
        <VStack px={5} bg={"gray.800"} alignContent={"center"} flex={1}>
          <Center h={"90%"}>
            <View>
              {data && data.length > stepNumber && (
                <Quize
                  variant={variant}
                  result={result}
                  setAnswer={(text) => {
                    setVariant(text);
                    setResult(null);
                  }}
                  {...data[stepNumber]}
                />
              )}

              {data && data.length - 1 < stepNumber && (
                <Center>
                  <Box h={100}>
                    <Text color={"white"}></Text>
                  </Box>
                </Center>
              )}
              {!data && isLoading && (
                <View mt={3} h={"50%"}>
                  <Skeleton borderRadius={10} h={"10%"} />
                  <Skeleton mt={3} borderRadius={10} h={"80%"} />
                </View>
              )}

              <View mt={4} alignItems={"center"}>
                <View
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  w={"70%"}
                >
                  {stepNumber > 0 && data && data.length > stepNumber && (
                    <Button
                      m={"auto"}
                      onPress={() => setStepNumber((prevState) => --prevState)}
                      variant={"outline"}
                    >
                      Back
                    </Button>
                  )}
                  {data && data.length > stepNumber && (
                    <Button onPress={Next} m={"auto"} variant={"solid"}>
                      Next
                    </Button>
                  )}
                </View>
              </View>
            </View>
          </Center>
        </VStack>
      </>
    </>
  );
};
