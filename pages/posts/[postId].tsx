import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import usePost from '@/hooks/usePost';
import { Form, Header } from '@/components';
import PostItem from '@/components/posts/PostItem';
import CommentFeed from '@/components/posts/CommentFeed';

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your replay"
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;