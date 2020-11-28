import { useRef, useEffect, useState } from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Navbar } from "../components/Navbar";
import {
  Link as ChakraLink,
  //   useToast,
  //   useColorMode,
  Box,
} from "@chakra-ui/core";
import { Listings } from "../components/Listings";
import { withApollo } from "../utils/withApollo";
import { useLikesQuery } from "../generated/graphql";

interface FavoritesProps {
  defaultColor: string;
}

const Favorites: React.FC<FavoritesProps> = ({ defaultColor }) => {
  const [fetchedListings, setFetchedListings] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { data, error, loading, fetchMore, variables } = useLikesQuery({
    variables: {
      limit: 25,
      cursor: cursor,
    },
    notifyOnNetworkStatusChange: true,
  });

  const bottomObserver = useRef<any>();
  const [bottom, setBottom] = useState<any>(null);

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
        // likesData={likesData}
        // handleFav={handleFav}
        linkPrefix={"images/"}
      />
    </Container>
  );
};

export default withApollo({ ssr: true })(Favorites);
