import {
  Link as ChakraLink,
  useToast,
  useColorMode,
  Box,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { DarkModeSwitch } from "../../components/DarkModeSwitch";
import { Navbar } from "../../components/Navbar";
import useListingsFetch from "../../hooks/useListingsFetch";
import { Listings } from "../../components/Listings";
import { withApollo } from "../../utils/withApollo";
import {
  useGetAllLikesQuery,
  useAddLikeMutation,
  GetAllLikesDocument,
  useMeQuery,
  useRemoveLikeMutation,
} from "../../generated/graphql";
import colors from "../../utils/colors";

interface SubProps {
  defaultColor: string;
}

const Sub: React.FC<SubProps> = ({ defaultColor }) => {
  const { data } = useGetAllLikesQuery();
  const likesData = data?.getAllLikes.likes.map((like: any) => like.postId);
  const router = useRouter();
  const sub = router.query.sub as string;
  const [cursor, setCursor] = useState<string | null>(null);
  const { fetchedListings, isLoading, next } = useListingsFetch({
    subreddit: sub,
    cursor: cursor,
  });
  const { data: meData } = useMeQuery();
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();

  const bottomObserver = useRef<any>();
  const [bottom, setBottom] = useState<any>(null);

  const { colorMode } = useColorMode();
  const textColor = {
    light: "white",
    dark: "black",
  };
  const color = {
    light: colors[defaultColor][500],
    dark: colors[defaultColor][200],
  };

  const toast = useToast();

  const handleFav = async (event: any) => {
    event.preventDefault();
    const id = event.currentTarget.id;
    const post = fetchedListings.filter((item) => item.id === id)[0];
    if (!meData?.me?.id) {
      router.push("/login");
    } else {
      toast({
        duration: 2000,
        isClosable: true,
        render: () => (
          <Box color={textColor[colorMode]} p={3} bg={color[colorMode]}>
            {likesData && likesData.includes(id)
              ? "Removed from favs"
              : "Added to favs"}
          </Box>
        ),
      });
    }

    if (likesData && likesData.includes(id)) {
      const { errors } = await removeLike({
        variables: {
          postId: id,
        },
        update: (store) => {
          const likeData: any = store.readQuery({
            query: GetAllLikesDocument,
          });
          store.writeQuery({
            query: GetAllLikesDocument,
            data: {
              getAllLikes: {
                likes: [...likeData!.getAllLikes.likes].filter(
                  (value: any) => value.postId !== id
                ),
              },
            },
          });
        },
      });
      if (errors) {
        router.push("/login");
      }
    } else {
      const { errors } = await addLike({
        variables: {
          input: {
            postId: id,
            subreddit: sub,
            title: post.title,
            preview: post.preview,
          },
        },
        update: (store) => {
          const likeData: any = store.readQuery({
            query: GetAllLikesDocument,
          });
          store.writeQuery({
            query: GetAllLikesDocument,
            data: {
              getAllLikes: {
                likes: [...likeData!.getAllLikes.likes, { postId: id }],
              },
            },
          });
        },
      });
      if (errors) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCursor(next);
      }
    });
    bottomObserver.current = observer;
  }, [next, isLoading, bottomObserver]);
  useEffect(() => {
    if (isLoading) return;
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom, isLoading, bottomObserver]);

  return (
    <Container minHeight="100vh" width="100vw">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Listings
        fetchedListings={fetchedListings}
        isLoading={isLoading}
        sub={sub}
        setBottom={setBottom}
        likesData={likesData}
        handleFav={handleFav}
      />
    </Container>
  );
};

export default withApollo({ ssr: true })(Sub);
