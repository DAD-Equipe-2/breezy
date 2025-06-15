import BackButton from "@/components/return";

export default async function UserProfile({ params }) {
  const { username } = await params;
  const isMyProfile = false; // TODO : call the API to check if the profile belongs to the logged-in user

  return (
    <div>
      <div className="flex h-[15vh] items-center bg-[#1F1F1F] p-4">
        <BackButton/>
      </div>
      <h1>Profil de @{username}</h1>
    </div>
  );
}