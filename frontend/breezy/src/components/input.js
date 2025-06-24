// components/Input.jsx
export default function Input({
  Hint,
  Type,
  value,
  onChange,
  FlexType = "flex-col",
  WithBorder = true,
  Gap = "gap-2",
  textarea = false,
  disabled = false
}) {
  return (
    <div
      className={`
        flex ${FlexType}
        ${WithBorder ? "border border-foreground" : ""}
        p-2 w-[90%] ${Gap}
      `}
    >
      <p className="text-foreground font-bold font-Roboto text-sm whitespace-nowrap">
        {Hint}
      </p>

      {textarea ? (
        <textarea
          rows={6}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            text-foreground font-thin text-xs font-Roboto
            bg-transparent flex-grow focus:outline-none
            resize-y p-2
          "
        />
      ) : (
        <input
          type={Type.toLowerCase()}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="
            text-foreground font-thin text-xs font-Roboto
            bg-transparent flex-grow focus:outline-none
          "
        />
      )}
    </div>
  );
}