import { useNavigate } from "react-router-dom";
import { timeDiff } from "../../../utils/relativeTime";

export const BlogCard = ({ blogData }: any): JSX.Element => {
  const navigate = useNavigate();

  const viewBlogOnClick = () => {
    navigate(`/blog/view/${blogData.blog}/${blogData.blog_slug}`);
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300 cursor-pointer group relative m-5">
      <div className="relative w-full h-48">
        <img
          src={
            blogData.blog_details.cover_image
              ? `http://localhost:8000${blogData.blog_details.cover_image}`
              : "/default-cover.jpg"
          }
          alt="cover"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 group-hover:opacity-10 transition duration-300"></div>
        <div className="absolute top-0 right-0 bg-indigo-600 px-4 text-white rounded-full h-14 w-14 flex flex-col items-center justify-center mt-3 mr-3 text-xs font-semibold">
          <span>{new Date(blogData.blog_details.created_at).getDate()}</span>
          <small>{new Date(blogData.blog_details.created_at).toLocaleString('default', { month: 'short' })}</small>
        </div>
      </div>
      <div className="px-6 py-4">
        <div onClick={viewBlogOnClick} className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out cursor-pointer">
          {blogData.blog_details.title}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          {blogData.blog_details.subtitle || "No subtitle available."}
        </p>
      </div>
      <div className="px-6 py-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              blogData.blog_details.author_profile_image
                ? `http://localhost:8000${blogData.blog_details.author_profile_image}`
                : "/default-profile.jpg"
            }
            alt="author-profileimage"
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">@{blogData.blog_details.author_username}</span>
        </div>
        <span className="py-1 text-xs text-gray-900 flex flex-row items-center">
          <svg height="13px" width="13px" viewBox="0 0 512 512" className="mr-1"><g><g><path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path></g></g></svg>
          <span>{timeDiff(new Date(blogData.blog_details.created_at).valueOf())}</span>
        </span>
      </div>
    </div>
  );
};
