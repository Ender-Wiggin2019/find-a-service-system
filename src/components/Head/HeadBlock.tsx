import React from 'react'
import { URLPath } from '~/services/lib/constants'

export type HeadProps = {
    title: string
    url: URLPath
}

export const Block: React.FC<HeadProps> = ({ title, url }) => {
    return (
        <li className='p-2 rounded-lg hover:bg-white hover:shadow-lg'>
            <a
                href={url}
                className='block text-head text-base rounded bg-transparent md:p-0 dark:text-white hover:text-button'
                aria-current='page'
            >
                {title}
            </a>
        </li>
    )
}
