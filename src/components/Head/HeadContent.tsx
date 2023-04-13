import React from 'react'
import { Role } from '~/services/types/user'
import { Block, HeadProps } from './HeadBlock'

type ContentProps = {
    role: Role
}

const RoleContentMap = new Map<Role, HeadProps[]>([
    [
        'customer',
        [
            { title: 'Home', url: '/customer-home' },
            { title: 'Services', url: '/services' },
        ],
    ],
    [
        'serviceProvider',
        [
            { title: 'Home', url: '/provider-home' },
            { title: 'Services', url: '/services' },
            { title: 'Create', url: '/service-creator' },
        ],
    ],
    [
        'admin',
        [
            { title: 'Home', url: '/admin' },
            { title: 'Services', url: '/services' },
        ],
    ],
    [
        'anonymous',
        [
            { title: 'Home', url: '/' },
            { title: 'Services', url: '/services' },
        ],
    ],
])

export const HeadContent: React.FC<ContentProps> = ({ role }) => {
    const list = RoleContentMap.get(role)
    return (
        <>
            {!list ||
                list.map((headParams, index) => <Block key={index} title={headParams.title} url={headParams.url} />)}
        </>
    )
}
