import { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  options = [],
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const toggleOpen = () => setIsOpen((open) => !open);

  const handleSelect = (option) => {
    setSelected(option);
    onChange && onChange(option);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-selector" ref={containerRef}>
      <div className="selected" onClick={toggleOpen}>
        {selected ? selected.label || selected : placeholder}
        <span className={`arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <div className="options">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`option ${selected === opt ? "selected" : ""}`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label || opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
