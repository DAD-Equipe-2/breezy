export default function Post({ image }) {
  return (
    <div className="flex post bg-foreground-500 text-primary p-4 rounded-lg border border-foreground shadow-md mb-4">
      <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
        <img
          src="/profil_picture.jpg"
          alt="Profil"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col ml-1 pr-2 space-y-2">
        <div className="flex whitespace-nowrap space-x-2">
          <h2 className="text-foreground font-bold text-sm font-roboto">Nom d'utilisateur</h2>
          <h3 className="text-secondary text-sm font-roboto">@Pseudo</h3>
          <p className="text-secondary text-sm font-roboto">17/06/2025</p>
        </div>
        <div>
          <p className="text-secondary text-sm font-roboto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {image && (
          <div>
            <img
              src="/paysage.jpg"
              alt="Post"
              className="max-w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex space-x-16">
          <div className="flex space-x-1">
            <button>
              {/* Icône 1 */}
              <svg className="text-foreground" stroke="currentColor" width="1.7rem" height="1.7rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.49999 20.25C4.37892 20.2521 4.25915 20.2248 4.1509 20.1705C4.04266 20.1163 3.94916 20.0366 3.87841 19.9383C3.80766 19.8401 3.76175 19.7261 3.74461 19.6063C3.72747 19.4864 3.73961 19.3641 3.77999 19.25L5.37999 14C5.03175 13.0973 4.85539 12.1375 4.85999 11.17C4.8584 10.1057 5.06918 9.0518 5.47999 8.06999C5.88297 7.13047 6.45975 6.27549 7.17999 5.54999C7.90382 4.82306 8.76344 4.24545 9.70999 3.84999C10.6889 3.4344 11.7415 3.22021 12.805 3.22021C13.8685 3.22021 14.9211 3.4344 15.9 3.84999C17.3341 4.46429 18.5573 5.48452 19.4191 6.7851C20.2808 8.08568 20.7434 9.60985 20.75 11.17C20.7437 13.2771 19.9065 15.2966 18.42 16.79C17.6945 17.5102 16.8395 18.087 15.9 18.49C14.0091 19.2819 11.8865 19.3177 9.96999 18.59L4.71999 20.19C4.64977 20.22 4.57574 20.2402 4.49999 20.25ZM12.8 4.74999C11.5334 4.75547 10.2962 5.13143 9.24068 5.83153C8.18519 6.53164 7.35763 7.52528 6.85999 8.68999C6.19883 10.2911 6.19883 12.0889 6.85999 13.69C6.91957 13.8548 6.91957 14.0352 6.85999 14.2L5.62999 18.37L9.77999 17.11C9.94477 17.0504 10.1252 17.0504 10.29 17.11C11.0824 17.439 11.932 17.6083 12.79 17.6083C13.648 17.6083 14.4976 17.439 15.29 17.11C16.0708 16.7813 16.779 16.3018 17.3742 15.6989C17.9693 15.096 18.4397 14.3816 18.7583 13.5967C19.077 12.8118 19.2376 11.9717 19.231 11.1245C19.2244 10.2774 19.0508 9.4399 18.72 8.65999C18.2234 7.50094 17.398 6.51285 16.3459 5.81792C15.2937 5.123 14.0609 4.75171 12.8 4.74999Z"/>
              </svg>
            </button>
            <p>3</p>
          </div>
          <div className="flex space-x-1">
            <button>
              {/* Icône 2 */}
              <svg className="text-foreground" stroke="currentColor" strokeWidth={2} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"/>
              </svg>
            </button>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
