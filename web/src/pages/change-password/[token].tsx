import React, { useState } from "react";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Link as ChakraLink, Button } from "@chakra-ui/core";
import { Container } from "../../components/Container";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import {
  useChangePasswordMutation,
  MeQuery,
  MeDocument,
} from "../../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../../utils/withApollo";

interface ChangePasswordProps {
  defaultColor: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.changePassword.user,
                },
              });
            },
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            const d = new Date();
            d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 365 * 10);
            const expires = d.toUTCString();
            document.cookie = `${response.data.changePassword.cookie!.name}=${
              response.data.changePassword.cookie!.value
            }; path=/; expires=${expires};`;
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="newPassword"
                placeholder="new password"
                label="New Password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Box>
                <Box color="red">{tokenError}</Box>
                <NextLink href="/forgot-password">
                  <ChakraLink>Request Password Reset</ChakraLink>
                </NextLink>
              </Box>
            ) : null}
            <Box mt={4}>
              <Button
                type="submit"
                colorScheme={defaultColor}
                isLoading={isSubmitting}
              >
                Change Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
