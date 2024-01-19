import { FcGoogle } from 'react-icons/fc'

export function ButtonGoogle() {
  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`}
      className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-4 py-2 text-xs text-black hover:bg-orange-100 sm:text-[100%]"
    >
      <FcGoogle size={24} /> Continuar com Google
    </a>
  )
}
