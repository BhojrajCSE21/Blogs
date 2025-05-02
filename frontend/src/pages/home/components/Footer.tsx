export const Footer = (): JSX.Element => {
  return (
    <footer className="w-full  bg-gradient-to-r from-[#d6eae5] to-[#d6eae5] shadow-inner border-t border-[#9dd5ca] mt-16">
      <div className="flex items-center justify-center mx-auto max-w-[1080px] h-16 px-4">
        <p className=" text-[#445046] tracking-wide font-medium drop-shadow-sm">
          Copyright &copy; {new Date().getFullYear()}, Blogs. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
