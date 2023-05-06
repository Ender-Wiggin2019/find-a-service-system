import React from 'react'
import { Role } from '~/services/types/user'
import { Block, HeadProps } from './HeadBlock'
import { useAuthState } from '~/utils/hooks/UserContext'

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
            { title: 'Verify', url: '/admin-verify' },
            { title: 'Remove', url: '/admin-remove' },
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
    [
        'nonVerifiedProvider',
        [
            { title: 'Home', url: '/wait-for-verify' },
            { title: 'Services', url: '/services' },
        ],
    ],
])

export const HeadContent: React.FC = () => {
    const { state } = useAuthState()
    const list = RoleContentMap.get(state.userType)
    return (
        <>
            {list &&
                list.map((headParams, index) => <Block key={index} title={headParams.title} url={headParams.url} />)}
        </>
    )
}
