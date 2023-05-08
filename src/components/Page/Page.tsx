// Container.tsx
import React, { ReactNode } from 'react'

type PageProps = {
    children: ReactNode
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <div className='w-full py-12 sm:w-3/4 md:w-w-4/5 lg:w-w-3/4 xl:w-3/4 2xl:w-3/4 mx-auto flex flex-col'>
            {children}
        </div>
    )
}

export default Page
