'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageCircle } from 'lucide-react';

interface Post {
  id: string;
  prompt?: string;
  content?: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData: Post[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Latest Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No posts available yet. Start creating!</p>
      ) : (
        posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">{post.prompt}</h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
            
            <div className="flex items-center space-x-6 mt-4">
              <button className="flex items-center text-blue-500 hover:text-blue-600 transition">
                <ThumbsUp size={18} className="mr-1" />
                Like
              </button>
              <button className="flex items-center text-gray-700 hover:text-gray-900 transition">
                <MessageCircle size={18} className="mr-1" />
                Comment
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
