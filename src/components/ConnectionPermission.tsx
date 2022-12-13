import { Center, Text, VStack } from "native-base";
import React from "react";

export const ConnectionPermission = () => {
  return (
    <>
      <>
        <VStack
          px={5}
          bg={"gray.800"}
          alignContent={"center"}
          flex={1}
          h={"100%"}
          w={"100%"}
        >
          <Center>
            <Text>Please, enable internet connection</Text>
          </Center>
        </VStack>
      </>
    </>
  );
};
