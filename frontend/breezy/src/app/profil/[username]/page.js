export default function UserProfile({ params }) {
  const { username } = params;
  const isMyProfile = false; // TODO : call the API to check if the profile belongs to the logged-in user

  return (
    <div>
      <h1>Profil de @{username}</h1>
    </div>
  );
}