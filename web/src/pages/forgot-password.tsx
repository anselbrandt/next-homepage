import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

interface ForgotPasswordProps {
  defaultColor: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ defaultColor }) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box justifyContent="center" mt={20}>
              <Box maxW={600} px={4}>
                If an account with that email exists, you will receive an email.
                <Box mt={20}>
                  <NextLink href="/">
                    <Button variant="outline" colorScheme={defaultColor}>
                      Home
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <Box mt={4}>
                <Button
                  type="submit"
                  colorScheme={defaultColor}
                  isLoading={isSubmitting}
                >
                  forgot password
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Container>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
