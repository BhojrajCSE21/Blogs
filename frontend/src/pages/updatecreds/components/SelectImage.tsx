import { useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { SelecImageProps } from "../types";

export const SelectImage = ({ previewImage, onChangeHandler }: SelecImageProps): JSX.Element => {
  const fileInputRef = useRef<any>();

  const selectImageOnClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    fileInputRef.current.click();
  };

  return (
    <div onClick={selectImageOnClick} className="flex flex-col items-center cursor-pointer">
      {previewImage ? (
        <img src={previewImage} alt={"preview-profileimage"} className="w-20 h-20 rounded-full object-cover border-[#9dd5ca] border-2" />
      ) : (
        <div className="rounded-full border-[#9dd5ca] border-2 p-1">
          <BiImageAdd size={80} color="#9dd5ca" />
        </div>
      )}

      <input type="file" name="profile-image" accept="image/*" ref={fileInputRef} onChange={onChangeHandler} className="hidden" />
    </div>
  );
};
