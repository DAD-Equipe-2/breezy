export default function Input({ Hint, Type, FlexType = "flex-col", WithBorder = true, Gap = "gap-2" }) {
  return (
    <div
      className={`flex ${FlexType} ${WithBorder ? "border border-foreground" : ""} p-2 w-[90%] ${Gap}`}
    >
      <p className="text-foreground font-bold font-Roboto text-sm whitespace-nowrap">
        {Hint}
      </p>
      <input
        type={Type}
        defaultValue=""
        className="text-foreground font-thin text-xs font-Roboto bg-transparent flex-grow focus:outline-none"
      />
    </div>
  );
}
