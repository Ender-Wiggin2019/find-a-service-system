import React from 'react'

export type HeadProps = {
    title: string
    url: string
}

export const Block: React.FC<HeadProps> = ({ title, url }) => {
    return (
        <li>
            <a
                href={url}
                className='block py-2 pl-3 pr-4 text-white bg-button rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
                aria-current='page'
            >
                {title}
            </a>
        </li>
    )
}
