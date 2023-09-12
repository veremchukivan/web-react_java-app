import { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface TextGroupProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string,
    field: string,
    rows: number,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    // error?: string|undefined,
    // touched?: boolean|undefined
}

const TextGroup : FC<TextGroupProps> = ({
    label,
    field,
    onChange,
    rows = 4,
    value
    }) => {
        return (
            <>
            <div>
                        <label
                            htmlFor={field}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {label}
                        </label>
                        <textarea
                            id={field}
                            name={field}
                            value={value}
                            onChange={onChange}
                            rows={rows}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Вкажіть опис..."
                        ></textarea>
                    </div>

            </>
        )

    }

    export default TextGroup;