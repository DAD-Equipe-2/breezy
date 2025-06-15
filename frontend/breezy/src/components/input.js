export default function Input({ Nickname }) {
  return (
    <div className="border border-foreground p-2 w-[90%]">
      <p className="text-foreground font-bold font-Roboto text-sm">
        {Nickname}
      </p>
      <input
        type="text"
        defaultValue=""
        className="text-foreground font-thin text-xs font-Roboto mt-2 bg-transparent w-full focus:outline-none"
      />
    </div>
  );
}