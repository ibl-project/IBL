import React from 'react'
import Image from 'next/image'
import RegistrationClosed from "@/public/texts/form/Registration Closed.svg"

export const FormClosed = () => {
  return (
    <div className='flex flex-col items-center gap-[605px]'>
      <Image
        src={RegistrationClosed}
        alt='Registration Closed'
      />
      <p className='font-drowner tracking-widest max-w-[883px] text-center text-[30px]'>
        Thank you for your enthusiasm and participation!The document submission period has officially ended.Stay tuned for the announcement!
      </p>
    </div>
  )
}
