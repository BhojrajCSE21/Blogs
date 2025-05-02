import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useGetAllBlogsQuery } from "../../hooks/blogs/useGetAllBlogsQuery";
import { BlogCard } from "./components/BlogCard";
import { CategorySelection } from "./components/CategorySelection";

export const ViewAllBlogs = (): JSX.Element => {
  const [catIndex, setCatIndex] = useState<any>({
    index: 0,
    cat: "all",
  });

  const [page, setPage] = useState<number>(1);

  const { data: blogs, isError: isErrorFetchBlog, isLoading: isLoadingFetchBlog } = useGetAllBlogsQuery(catIndex.cat, page);

  const pageChangeOnChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  if (isErrorFetchBlog) {
    return <ErrorMessage />;
  }

  return (
    <div className="mx-auto max-w-[1080px] mt-20">
      <CategorySelection catIndex={catIndex} setCatIndex={setCatIndex} />

      {isLoadingFetchBlog ? (
        <div className="flex flex-col justify-center items-center">
          <ClipLoader color="#000000" loading={isLoadingFetchBlog} size={25} aria-label="loading-spinner" data-testid="loader" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {blogs?.results?.result?.map((blogData: any, index: number) => (
            <BlogCard key={index} blogData={blogData} />
          ))}
        </div>
      )}

      <div className="mt-8 p-2">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={blogs?.results["total_pages"]}
          marginPagesDisplayed={4}
          pageRangeDisplayed={6}
          onPageChange={pageChangeOnChange}
          containerClassName={"rounded-md flex justify-center gap-2"}
          pageClassName={"border-[0.8px] border-slate-300 text[#445046] font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md hover:bg-[#9dd5ca]"}
          previousClassName={"text-[#445046] font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md border-[0.8px] border-slate-300 hover:bg-[#9dd5ca]"}
          nextClassName={"text-[#445046] font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md border-[0.8px] border-slate-300 hover:bg-[#9dd5ca]"}
          breakClassName={"text-[#445046]"}
          activeClassName={"bg-[#9dd5ca] "}
        />
      </div>
    </div>
  );
};
