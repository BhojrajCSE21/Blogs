import { ClipLoader } from "react-spinners";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useGetSavedBlogsQuery } from "../../hooks/readinglist/useGetSavedBlogsQuery";
import { BlogCard } from "./components/BlogCard";

export const ReadingList = (): JSX.Element => {
  const authToken = localStorage.getItem("authToken");
  const { data: savedBlogs, isError: isErrorFetchSavedBlogs, isLoading: isLoadingFetchSavedBlogs } = useGetSavedBlogsQuery(authToken);

  if (isErrorFetchSavedBlogs) {
    return <ErrorMessage />;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-10 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {isLoadingFetchSavedBlogs ? (
          <div className="flex flex-col justify-center items-center col-span-full">
            <ClipLoader color="#000000" loading={isLoadingFetchSavedBlogs} size={25} aria-label="loading-spinner" data-testid="loader" />
          </div>
        ) : (
          <>
            {savedBlogs?.map((blog: any, index: number) => (
              <BlogCard key={index} blogData={blog} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
