import { useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { SelectCoverImageProps } from "../types";

export const SelectCoverImage = ({ previewImage, onChangeHandler }: SelectCoverImageProps): JSX.Element => {
  const fileInputRef = useRef<any>();

  const selectImageOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    fileInputRef.current.click();
  };

  return (
    <div onClick={selectImageOnClick} className="flex flex-col items-center cursor-pointer w-full p-2 mt-2">
      {previewImage ? (
        <img src={previewImage} alt={"preview-profileimage"} className="rounded-md w-full h-[11.25rem] object-cover border-[#9dd5ca] border-2" />
      ) : (
        <div className="rounded-md border-[#9dd5ca] border-2 border-dotted p-2 w-full flex justify-center">
          <BiImageAdd size={180} color="#9dd5ca" />
        </div>
      )}

      <input type="file" name="profile-image" accept="image/*" ref={fileInputRef} onChange={onChangeHandler} className="hidden" />
    </div>
  );
};
