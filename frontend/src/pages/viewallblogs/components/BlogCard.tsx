/* eslint-disable jsx-a11y/img-redundant-alt */
import { HiFire } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { timeDiff } from "../../../utils/relativeTime";

export const BlogCard = ({ blogData }: any): JSX.Element => {
  const navigate = useNavigate();

  const viewBlogOnClick = () => {
    navigate(`/blog/view/${blogData.id}/${blogData.slug}`);
  };

  return (
    <article
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 dark:bg-gray-700 px-4 py-6 pb-6 pt-48 sm:pt-32 lg:pt-48 w-[95%] sm:w-full mt-4 border-[1.5px] border-slate-200 shadow-md shadow-slate-300 hover:scale-105 duration-300 cursor-pointer"
      onClick={viewBlogOnClick}
    >
      {/* Cover image */}
      <img
        src={
          blogData["cover_image"]
            ? `https://blogs-azkq.onrender.com${blogData["cover_image"]}`
            : "/default-cover.jpg"
        }
        alt="cover-image"
        className="absolute inset-0 -z-10 h-full w-full object-cover pointer-events-none"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

      {/* Author info & date */}
      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300 px-2">
        <p className="mr-8">{timeDiff(new Date(blogData.created_at).valueOf())}</p>
        <div className="-ml-4 flex items-center gap-x-4">
          <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
            <circle cx="1" cy="1" r="1"></circle>
          </svg>
          <div className="flex gap-x-2.5 items-center">
            <img
              src={
                blogData["author_profile_image"]
                  ? `https://blogs-azkq.onrender.com${blogData["author_profile_image"]}`
                  : "/default-profile.jpg"
              }
              alt="author-profile-image"
              className="h-7 w-7 sm:h-10 sm:w-10 flex-none rounded-full bg-white/10"
            />
            <span className="text-gray-200 font-semibold">{blogData["author_username"]}</span>
          </div>
        </div>
      </div>

      {/* Title & subtitle */}
      <h2
        className="mt-3 text-lg font-semibold leading-6 text-white cursor-pointer w-full whitespace-nowrap overflow-hidden overflow-ellipsis px-2"
      >
        {blogData.title}
      </h2>
      <p className="px-2 pt-1 text-[0.75rem] hidden sm:block text-gray-300 text-justify whitespace-nowrap overflow-hidden overflow-ellipsis">
        {blogData.subtitle}
      </p>

      {/* Likes */}
      <div className="flex items-center gap-2 px-2 pt-2">
        <HiFire className="w-4 text-orange-400" />
        <p className="text-sm text-gray-200">{Intl.NumberFormat("en", { notation: "compact" }).format(blogData["applaud_count"])}</p>
      </div>
    </article>
  );
};
