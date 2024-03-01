import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AES, enc } from 'crypto-js'

const Greetings = () => {
  const encryptedData = Cookies.get('userData')
  const secretKeyCookie = import.meta.env.VITE_SECRET_KEY_COOKIE
  const [currentUserData, setCurrentUserData] = useState<{ username: string, email: string }>({ username: '', email: '' })

  useEffect(() => {
    if (encryptedData && secretKeyCookie) {
      const decryptedBytes = AES.decrypt(encryptedData, secretKeyCookie);
      const userData = JSON.parse(decryptedBytes.toString(enc.Utf8))
      setCurrentUserData(userData)
    }
  }, [])

  return (
    <section className='flex flex-col items-start gap-1 m-2'>
      {
        currentUserData ?
          <p className='text-center text-slate-900 text-sm font-bold'>Hello {currentUserData.username} !</p> :
          <p className='text-center text-slate-900 text-sm'>Welcome Guest</p>
      }
      <p className='text-center text-slate-900 text-sm'>Welcome to Task Manager</p>
    </section>
  )
}

export default Greetings