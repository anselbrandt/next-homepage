import { Box, useColorMode, BoxProps } from "@chakra-ui/core";
import { withApollo } from "../utils/withApollo";
import {
  useServerStatusQuery,
  useQueryNotificationSubscription,
} from "../generated/graphql";
import { useEffect, useState } from "react";
import { Ellipsis } from "../animation/Ellipsis";

interface Notification {
  message: string;
  time: string;
}

interface LocalGraphqlProps {
  defaultColor: string;
  props: BoxProps;
}

const LocalGraphql: React.FC<LocalGraphqlProps> = ({ defaultColor, props }) => {
  const { colorMode } = useColorMode();
  const themeColor = {
    light: `${defaultColor}.500`,
    dark: `${defaultColor}.200`,
  };

  const { data: qdata } = useServerStatusQuery();
  const { data: subdata } = useQueryNotificationSubscription();

  const [notification, setNotification] = useState<Notification | undefined>();

  useEffect(() => {
    if (subdata && subdata.subscription) {
      const message = subdata.subscription.message;
      const time = new Date(subdata.subscription.time).toLocaleTimeString();
      const newNotification = { message: message, time: time };
      setNotification(newNotification);
    }
  }, [subdata]);

  return (
    <Box>
      <Box
        border="1px solid"
        borderColor={themeColor[colorMode]}
        mt="1rem"
        p="1.75rem"
        {...props}
      >
        {qdata ? (
          <Box textAlign="center" my="2rem">
            {qdata.hello.status}
          </Box>
        ) : (
          <Box>
            Waking server
            <Ellipsis />
          </Box>
        )}
        {notification ? (
          <Box textAlign="center" mb="2rem">
            {notification.message} at {notification.time}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default withApollo({ ssr: true })(LocalGraphql);
