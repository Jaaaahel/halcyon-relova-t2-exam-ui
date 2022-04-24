import Image from "next/image";
import { FC } from "react";

const uploadsPath = `${process.env.NEXT_PUBLIC_API_URL}/uploads`;

export interface Props {
  url?: string;
}

const Avatar: FC<Props> = ({ url }) => {
  if (url) {
    return (
      <Image
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
        src={`${uploadsPath}/${url}`}
        alt="avatar"
        layout="raw"
        width={40}
        height={40}
      />
    );
  }

  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <svg
        className="absolute w-12 h-12 text-gray-400 -left-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};

export default Avatar;
