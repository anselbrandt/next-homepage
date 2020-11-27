import { Link as ChakraLink } from "@chakra-ui/core";
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
} from "../../generated/graphql";

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

  const bottomObserver = useRef<any>();
  const [bottom, setBottom] = useState<any>(null);

  const handleFav = (event: any) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
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
