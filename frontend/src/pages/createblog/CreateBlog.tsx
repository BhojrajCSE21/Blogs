import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { usePostBlogMutation } from "../../hooks/blogs/usePostBlogMutation";
import { categoryData } from "../../utils/categories";
import { reactQuillModules } from "../../utils/constants";
import { SelectCoverImage } from "./components/SelectCoverImage";

export const CreateBlog = (): JSX.Element => {
  const authToken = localStorage.getItem("authToken");
  const [isLoadingPublish, setIsLoadingPublish] = useState<boolean>(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(false);
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>();
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const { mutate: postBlog } = usePostBlogMutation(
    (_: any) => {
      setIsLoadingPublish(false);
      setIsLoadingDraft(false);
      navigate("/", { replace: true });
    },
    (_: any) => {
      setIsLoadingPublish(false);
      setIsLoadingDraft(false);
      toast.error("Error in posting blog. Please try again later.");
    }
  );

  useEffect(() => {
    if (coverImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCoverImage(reader.result as string);
      };
      reader.readAsDataURL(coverImage);
    } else {
      setPreviewCoverImage(null);
    }
  }, [coverImage]);

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const subtitleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSubtitle(e.target.value);
  };

  const categoryOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCategory(e.target.value);
  };

  const coverImageOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      setCoverImage(files[0]);
    } else {
      setCoverImage(null);
    }
  };

  const validateFormData = (): boolean => {
    if (!title || !subtitle || !category) {
      toast.error("All fields are mandatory except the cover-image");
      return false;
    } else if (title.length < 10 || title.length > 255) {
      toast.error("Title must be between 10-255 characters");
      return false;
    } else if (subtitle.length < 10 || subtitle.length > 255) {
      toast.error("Subtitle must be between 10-300 characters");
      return false;
    }

    return true;
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>, status: string): void => {
    e.preventDefault();

    if (validateFormData()) {
      if (status === "draft") {
        setIsLoadingDraft(true);
      } else {
        setIsLoadingPublish(true);
      }

      const data = new FormData();
      data.append("title", title);
      data.append("subtitle", subtitle);
      data.append("cover_image", coverImage!);
      data.append("category", category);
      data.append("content", content);
      data.append("status", status);

      postBlog({ data, authToken });
    }
  };

  return (
    <div className="mx-auto max-w-2xl mt-24 w-full bg-white/90 rounded-2xl shadow-2xl border border-[#9dd5ca] p-6 backdrop-blur-md">
      <form className="w-full h-full flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col items-start gap-1">
          <label className="text-lg font-semibold text-[#445046] mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title of your blog... (10-255 characters)"
            minLength={10}
            maxLength={255}
            onChange={titleOnChange}
            className="border border-[#9dd5ca] rounded-xl text-base w-full p-3 bg-white/70 focus:border-[#445046] focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-start gap-1">
          <label className="text-lg font-semibold text-[#445046] mb-1">Sub-title</label>
          <input
            type="text"
            name="subtitle"
            placeholder="Sub-title of your blog... (10-300 characters)"
            min={10}
            maxLength={300}
            onChange={subtitleOnChange}
            className="border border-[#9dd5ca] rounded-xl text-base w-full p-3 bg-white/70 focus:border-[#445046] focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          {categoryData.map((cat, index) => (
            <label key={index} className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-[#9dd5ca] bg-white/60 text-[#445046] font-medium shadow-sm transition-all duration-200 hover:bg-[#9dd5ca]/30 ${category === cat.value ? 'ring-2 ring-[#445046] bg-[#9dd5ca]/60' : ''}`}>
              <input type="radio" name={cat.name} value={cat.value} checked={category === cat.value} onChange={categoryOnChange} className="accent-[#445046]" />
              {cat.label.charAt(0).toUpperCase() + cat.label.slice(1)}
            </label>
          ))}
        </div>

        <SelectCoverImage previewImage={previewCoverImage} onChangeHandler={coverImageOnChange} />

        {/* Editor */}
        <div className="w-full">
          <ReactQuill theme="snow" modules={reactQuillModules} onChange={setContent} placeholder="Start writing :) ..." preserveWhitespace className="rounded-xl border border-[#9dd5ca] bg-white/70 min-h-[200px] focus:border-[#445046] transition-all duration-200" />
        </div>

        {/* Draft/publish buttons */}
        <div className="flex justify-center">
          <div className="flex justify-between gap-x-6 items-center w-full">
            <button
              type="button"
              onClick={(e) => {
                submit(e, "draft");
              }}
              className="rounded-full w-1/2 border-2 border-[#445046] text-[#445046] font-semibold py-2 bg-gradient-to-r from-[#9dd5ca]/60 to-white hover:from-white hover:to-[#9dd5ca]/60 hover:scale-105 transition-all duration-200 shadow-md"
            >
              {isLoadingDraft ? <ClipLoader color="#445046" loading={isLoadingDraft} size={18} aria-label="loading-spinner" data-testid="loader" /> : "Save as Draft"}
            </button>
            <button
              type="button"
              onClick={(e) => {
                submit(e, "publish");
              }}
              className="rounded-full w-1/2 bg-gradient-to-r from-[#445046] to-[#9dd5ca] text-white font-semibold py-2 border-2 border-[#445046] hover:from-[#9dd5ca] hover:to-[#445046] hover:text-[#445046] hover:bg-white hover:scale-105 transition-all duration-200 shadow-md"
            >
              {isLoadingPublish ? <ClipLoader color="#fff" loading={isLoadingPublish} size={18} aria-label="loading-spinner" data-testid="loader" /> : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
