import { useRef, useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import {
  Link as ChakraLink,
  useToast,
  useColorMode,
  Box,
} from "@chakra-ui/core";
import { Listings } from "../components/Listings";
import { withApollo } from "../utils/withApollo";
import {
  useLikesQuery,
  useGetAllLikesQuery,
  useAddLikeMutation,
  GetAllLikesDocument,
  useMeQuery,
  useRemoveLikeMutation,
} from "../generated/graphql";
import colors from "../utils/colors";
import { useRouter } from "next/router";

interface FavoritesProps {
  defaultColor: string;
}

const Favorites: React.FC<FavoritesProps> = ({ defaultColor }) => {
  const router = useRouter();
  const [fetchedListings, setFetchedListings] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { data, loading } = useLikesQuery({
    variables: {
      limit: 25,
      cursor: cursor,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: meData } = useMeQuery();
  const { data: allLikesData } = useGetAllLikesQuery();
  const likesData = allLikesData?.getAllLikes.likes.map(
    (like: any) => like.postId
  );
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
            subreddit: post.subreddit,
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
    if (data) {
      setHasMore(data?.likes.hasMore);
      const favorites = data?.likes.likes.map((entry) => {
        return {
          createdAt: entry.createdAt,
          id: entry.postId,
          title: entry.details.title,
          subreddit: entry.details.subreddit,
          preview: entry.details.preview,
        };
      });
      setFetchedListings((prev: any) => [...prev, ...favorites]);
    }
  }, [data]);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setCursor(fetchedListings[fetchedListings.length - 1].createdAt);
      }
    });
    bottomObserver.current = observer;
  }, [loading, bottomObserver, hasMore]);

  useEffect(() => {
    if (loading) return;
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom, loading, bottomObserver]);

  return (
    <Container minHeight="100vh" width="100vw">
      <DarkModeSwitch defaultColor={defaultColor} />
      <Navbar defaultColor={defaultColor}>
        <ChakraLink href="/">Home</ChakraLink>
      </Navbar>
      <Listings
        fetchedListings={fetchedListings}
        isLoading={loading}
        setBottom={setBottom}
        likesData={likesData}
        handleFav={handleFav}
        linkPrefix={"images/"}
      />
    </Container>
  );
};

export default withApollo({ ssr: true })(Favorites);
