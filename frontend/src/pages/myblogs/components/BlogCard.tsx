import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDeleteBlogQuery } from "../../../hooks/blogs/useDeleteBlogMutation";
import { timeDiff } from "../../../utils/relativeTime";
import { BlogCardProps } from "../types";

export const BlogCard = ({ blogData, status, authToken }: BlogCardProps): JSX.Element => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteBlog } = useDeleteBlogQuery(() => {
    queryClient.invalidateQueries(["get-user-blogs", status]);
  });

  const viewBlogOnClick = () => {
    if (blogData.status === "publish") {
      navigate(`/blog/view/${blogData.id}/${blogData.slug}/`);
    }
  };

  const editBlogOnClick = () => {
    navigate(`/blog/edit/${blogData.id}/`);
  };

  const deleteBlogOnClick = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      let blogId: string = blogData.id;
      deleteBlog({ blogId, authToken });
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 cursor-pointer group relative w-full">
      <div className="relative w-full h-48">
        <img
          src={blogData.cover_image ? `{blogData.cover_image}` : "/default-cover.jpg"}
          alt="cover"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 group-hover:opacity-10 transition duration-300"></div>
        <div className="absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-14 w-14 flex flex-col items-center justify-center mt-3 mr-3 text-xs font-semibold">
          <span>{new Date(blogData.created_at).getDate()}</span>
          <small>{new Date(blogData.created_at).toLocaleString('default', { month: 'short' })}</small>
        </div>
      </div>
      <div className="px-6 py-4">
        <div onClick={viewBlogOnClick} className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out cursor-pointer">
          {blogData.title}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {blogData.subtitle || "No subtitle available."}
        </p>
      </div>
      <div className="px-6 py-4 flex flex-row items-center justify-between">
        <span className="py-1 text-xs text-gray-900 flex flex-row items-center">
          <svg height="13px" width="13px" viewBox="0 0 512 512" className="mr-1"><g><g><path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path></g></g></svg>
          <span>{timeDiff(new Date(blogData.created_at).valueOf())}</span>
        </span>
        <div className="flex items-center gap-x-2">
          <AiFillEdit onClick={editBlogOnClick} className="hover:scale-110 duration-300 cursor-pointer w-8 h-8 bg-yellow-300 rounded-full p-1" />
          <AiFillDelete onClick={deleteBlogOnClick} className="hover:scale-110 duration-300 cursor-pointer w-8 h-8 hover:bg-red-400 rounded-full p-1" />
        </div>
      </div>
    </div>
  );
};
