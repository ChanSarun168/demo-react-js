import { useState , useEffect } from "react";

export const SingleChoiceChip = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(value || null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() => {
            setSelected(option);
            onChange?.(option);
          }}
          className={`px-4 py-1 rounded-full border ${
            selected === option
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-500"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export const MultiChoiceChip = ({ options, onChange }) => {
  const [selected, setSelected] = useState([]);

  const toggle = (option) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => toggle(option)}
          className={`px-4 py-1 rounded-full border ${
            selected.includes(option)
              ? "bg-green-600 text-white border-green-600"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-500"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
