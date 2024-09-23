import { defineStore } from "pinia";
import type { FindParams, Level, Post } from "./types";
import { useCurrentUserStore } from "../users/useCurrentUserStore";
import { useUsersStore } from "../users/useUsersStore";

export const usePostsStore = defineStore("posts", () => {
  const { currentUser } = useCurrentUserStore();
  const { usersLists, getUserById } = useUsersStore();

  const posts = ref<Post[]>([
    {
      id: 1,
      userId: 1,
      date: "2023-10-10T04:00:00Z",
      views: 328,
      likes: 72,
      dislikes: 1,
      liked: true,
      disliked: false,
      level: 1,
      post: "Iste dicta odit similique iure. Recusandae obcaecati laborum dolore explicabo dolorum? Rem sint quis, in omnis obcaecati nam. Culpa totam blanditiis dolorum.",
      parentId: undefined,
    },
    {
      id: 2,
      userId: 7,
      date: "2023-10-10T04:00:00Z",
      views: 480,
      likes: 122,
      dislikes: 4,
      liked: true,
      disliked: false,
      level: 1,
      post: "Culpa totam blanditiis dolorum",
      parentId: undefined,
    },
    {
      id: 3,
      userId: 8,
      date: "2023-10-10T04:00:00Z",
      views: 100,
      likes: 37,
      dislikes: 1,
      liked: true,
      disliked: false,
      level: 2,
      post: "Recusandae obcaecati laborum dolore explicabo dolorum",
      parentId: 2,
    },
  ]);

  function getPost(postId: number) {
    return posts.value.find((post) => post.id === postId);
  }

  function findPosts(params?: FindParams) {
    return posts.value
      .filter((post) =>
        params?.parentId ? post.parentId === params.parentId : true
      )
      .filter((post) => (params?.level ? post.level === params.level : true))
      .filter((post) =>
        params?.userId ? post?.userId === params?.userId : true
      );
  }

  function likePost(postId: number) {
    const selectedPost = getPost(postId);

    if (!selectedPost) return;

    if (selectedPost.liked) {
      --selectedPost.likes;
      selectedPost.liked = false;
    } else {
      ++selectedPost.likes;
      selectedPost.liked = true;
    }

    if (selectedPost.disliked) {
      --selectedPost.dislikes;
      selectedPost.disliked = false;
    }
  }

  function dislikePost(postId: number) {
    const selectedPost = getPost(postId);

    if (!selectedPost) return;

    if (selectedPost.disliked) {
      --selectedPost.dislikes;
      selectedPost.disliked = false;
    } else {
      ++selectedPost.dislikes;
      selectedPost.disliked = true;
    }

    if (selectedPost.liked) {
      --selectedPost.likes;
      selectedPost.liked = false;
    }
  }

  function addNewPost(post: string, parentId?: number, level?: Level) {
    if (!post.trim().length) return;

    const id = Math.random();
    posts.value.unshift({
      id,
      userId: currentUser.id,
      date: new Date().toISOString(),
      post,
      views: 0,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      level: level || 1,
      parentId,
    });
  }

  function editPost(postId: number, newPost: string) {
    const selectedPost = getPost(postId);

    if (!selectedPost) return;

    selectedPost.post = newPost;
    selectedPost.edited = true;
  }

  function removePost(post: Post) {
    const selectedPost = getPost(post.id);

    if (!selectedPost) return;

    posts.value = posts.value.filter((p) => {
      const children = posts.value.filter((p2) => p2.parentId === post.id);
      const childrenIds = children.map((child) => child.id);

      if (p.parentId && childrenIds.includes(p.parentId)) {
        return false;
      }

      return p.id !== post.id && p.parentId !== post.id;
    });
  }

  return {
    posts,
    addNewPost,
    removePost,
    editPost,
    likePost,
    dislikePost,
    findPosts,
  };
});
