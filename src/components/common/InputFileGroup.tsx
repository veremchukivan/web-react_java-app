import { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: string;
  filesContent: JSX.Element[];
  filesOldContent: JSX.Element[] | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputFileGroup: FC<InputFileProps> = ({
  label,
  field,
  filesContent,
  filesOldContent = null,
  onChange,
}) => {
  return (
    <>
      <div>
        <div>
          <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 items-center gap-4">
          {filesOldContent}
            {filesContent}
          </div>
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>

          <div className="mt-1 flex items-center">
            <label
              htmlFor={field}
              className="ml-5 rounded-md border border-gray-300 bg-white
                        py-2 px-3 text-sm font-medium leading-4 text-gray-700
                        shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                        focus:ring-indigo-500 focus:ring-offset-2"
            >
              Обрати {label}
            </label>
          </div>

          <input
            type="file"
            id={field}
            className="hidden"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};

export default InputFileGroup;
