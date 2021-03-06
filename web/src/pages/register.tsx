import { Box, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import { InputField } from "../components/InputField";

interface RegisterProps {
  defaultColor: string;
}

const Register: React.FC<RegisterProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Container minHeight="100vh">
      <Navbar defaultColor={defaultColor} />

      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.register.user,
                },
              });
            },
          });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            const d = new Date();
            d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 365 * 10);
            const expires = d.toUTCString();
            document.cookie = `${response.data.register.cookie!.name}=${
              response.data.register.cookie!.value
            }; expires=${expires};`;
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.back();
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField name="email" placeholder="email" label="Email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              colorScheme={defaultColor}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withApollo({ ssr: false })(Register);
