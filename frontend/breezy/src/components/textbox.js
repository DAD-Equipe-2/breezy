export default function TextBox() {
  return ( 
    <div className="flex post bg-foreground text-primary">
      <div className="flex flex-col ml-8 my-2 pr-2 space-y-2 w-full">
        <div className="border border-black p-2 w-[90%]">
          <p className="text-background font-bold font-Roboto text-sm">Nickname</p>
          <p className="text-background font-thin text-xs font-Roboto mt-2">Loangayard</p>
        </div>
      </div>
    </div>
  );
}