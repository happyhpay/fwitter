import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

interface PostFeedProps {
  userId?: string;
}

const Post: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  console.log('posts', posts);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default Post;
