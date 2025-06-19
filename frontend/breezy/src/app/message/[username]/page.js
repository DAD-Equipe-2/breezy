import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaPaperPlane } from "react-icons/fa";

const messages = [
  { id: 1, sender: "friend", content: "Hey ! Comment tu vas ?", date: "2023-10-01T12:00:00Z" },
  { id: 2, sender: "me", content: "Yo, tranquille et toi ?", date: "2023-10-01T12:00:30Z" },
  { id: 3, sender: "friend", content: "Ça va bien aussi. T'as fait quoi ce week-end ?", date: "2023-10-01T12:01:00Z" },
  { id: 4, sender: "me", content: "J'ai taffé un peu sur un projet React.", date: "2023-10-01T12:01:30Z" },
  { id: 5, sender: "friend", content: "T'es chaud en React toi maintenant 😄", date: "2023-10-01T12:02:00Z" },
  { id: 6, sender: "me", content: "Haha, je m'améliore ouais !", date: "2023-10-01T12:02:30Z" },
  { id: 7, sender: "friend", content: "Tu bosses sur quoi exactement ?", date: "2023-10-01T12:03:00Z" },
  { id: 8, sender: "me", content: "Une messagerie, style Insta DM mais light.", date: "2023-10-01T12:03:30Z" },
  { id: 9, sender: "friend", content: "Trop stylé. Tu utilises Tailwind ?", date: "2023-10-01T12:04:00Z" },
  { id: 10, sender: "me", content: "Évidemment, j’fais tout avec Tailwind maintenant.", date: "2023-10-01T12:04:30Z" },
  { id: 11, sender: "friend", content: "Je devrais m’y mettre aussi...", date: "2023-10-01T12:05:00Z" },
  { id: 12, sender: "me", content: "Fonce, tu vas plus jamais vouloir faire du CSS normal.", date: "2023-10-01T12:05:30Z" },
  { id: 13, sender: "friend", content: "T'as un tuto ou une ref à me conseiller ?", date: "2023-10-01T12:06:00Z" },
  { id: 14, sender: "me", content: "Ouais, je t’envoie une playlist YouTube après.", date: "2023-10-01T12:06:30Z" },
  { id: 15, sender: "friend", content: "Merci bg 🙏", date: "2023-10-01T12:07:00Z" },
  { id: 16, sender: "me", content: "Avec plaisir 😎", date: "2023-10-01T12:07:30Z" },
  { id: 17, sender: "friend", content: "T’as prévu quoi ce soir ?", date: "2023-10-01T12:08:00Z" },
  { id: 18, sender: "me", content: "Ptit skate avec mon frère puis chill.", date: "2023-10-01T12:08:30Z" },
  { id: 19, sender: "friend", content: "Grave cool, profitez bien 🙌", date: "2023-10-01T12:09:00Z" },
  { id: 20, sender: "me", content: "Merci bro !", date: "2023-10-01T12:09:30Z" },
];

messages.sort((a, b) => new Date(a.date) - new Date(b.date));

export default function PrivateMessagesPage() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-muted">
        <Return />
        <img
          src="/profil_picture.jpg"
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
        />
        <div className="font-medium">Nom Prénom</div>
      </div>

      {/* Messages - zone scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const msgDate = new Date(msg.date).toLocaleString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[70%] px-4 py-2 rounded-2xl border text-sm ${
                msg.sender === "me"
                  ? "bg-primary text-primary-foreground self-end ml-auto border-primary"
                  : "bg-muted text-foreground self-start border-muted-foreground"
              }`}
            >
              <div>{msg.content}</div>
              <div className="text-[10px] text-muted-foreground mt-1 text-right">{msgDate}</div>
            </div>
          );
        })}
      </div>

      {/* Footer - input + send */}
      <div className="p-4 border-t border-muted flex items-center gap-2">
        <Input placeholder="Écris un message..." className="flex-1" />
        <Button
          icon={<FaPaperPlane className="w-5 h-5" />}
          color="bg-primary"
          textcolor="text-primary-foreground"
          bordercolor="border-primary"
          paddingX="px-4"
          textFondSize="text-sm"
        />
      </div>
    </div>
  );
}
