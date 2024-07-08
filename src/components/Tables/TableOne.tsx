import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {Post} from "../../types/Post";

const TableOne = () => {

  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState<string | null>(null);
  const postsCollection = collection(db, "posts");
  const getPosts = async () => {
    try {
      const data = await getDocs(postsCollection);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
      console.log("Posts fetched successfully:", data.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
    getPosts();
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 dark:bg-meta-4">
            <th className="p-2.5">Img</th>
            <th className="p-2.5">Title</th>
            <th className="p-2.5">Description</th>
            <th className="p-2.5">Category</th>
            <th className="p-2.5">State</th>
            <th className="p-2.5">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((brand, key) => (
            <tr
              className={`${key === posts.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'}`}
              key={key}
            >
              <td className="items-center justify-center p-1 xl:p-2">
                {brand.downloadURL && (
                  <img src={brand.downloadURL} alt="Image" className="w-12 h-12 object-cover rounded-full" />
                )}
              </td>
              <td className="items-center justify-centers">
                <p className=" text-black dark:text-white   p-1 xl:p-2">{brand.title}</p>
              </td>
              <td className="items-center justify-center">
                <p className="text-black dark:text-white  p-1 xl:p-2">{brand.description}</p>
              </td>
              <td className=" items-center justify-center">
                <p className="text-black dark:text-white  p-1 xl:p-2">{brand.category}</p>
              </td>
              <td className=" items-center justify-center ">
                <p className="text-meta-5">{brand.state}</p>
              </td>
              <td className=" items-center justify-center ">
                <button onClick={() => deletePost(brand.id)} className="text-meta-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;
