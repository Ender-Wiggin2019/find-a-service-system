import React from 'react'
import { URLPath } from '~/services/lib/constants'

export type HeadProps = {
    title: string
    url: URLPath
}

export const Block: React.FC<HeadProps> = ({ title, url }) => {
    return (
        <li>
            <a
                href={url}
                className='block py-2 pl-3 pr-4 text-head rounded bg-transparent md:p-0 dark:text-white'
                aria-current='page'
            >
                {title}
            </a>
        </li>
    )
}
