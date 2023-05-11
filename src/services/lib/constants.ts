import React from 'react'
import { Role } from '../types/user'

export const SERVICE_PROVIDER_IMAGE_PATH = 'service_provider_images/'

// !Note: each time add a new collection, define a new constant here
export enum FirebasePath {
    SERVICE_PROVIDER = 'serviceProvider',
    CUSTOMER = 'customer',
    SERVICE = 'service',
    COMMENT = 'comment',
    REQUEST = 'request',
    ADMIN = 'admin',
    NOTIFICATION = 'notification',
}

export type URLPath =
    | '/'
    | '/login'
    | '/register'
    | '/service-creator'
    | '/customer-home'
    | '/services'
    | '/service/:serviceId'
    | '/setting'
    | '/admin-verify'
    | '/admin-remove'
    | '/requestHistory'
    | '/request-list'
    | '/provider-home'
    | '/notifications'
    | '/wait-for-verify'
    | '/service-editor/:serviceId'
    | '*'

export const AuthMap = new Map<Role, URLPath[]>([
    [
        'customer',
        [
            '*',
            '/',
            '/customer-home',
            '/services',
            '/service/:serviceId',
            '/setting',
            '/requestHistory',
            '/login',
            '/notifications',
        ],
    ],
    [
        'serviceProvider',
        ['*', '/', '/service-creator', '/service/:serviceId', '/service-editor/:serviceId', '/provider-home', '/services', '/request-list', '/login'],
    ],
    ['anonymous', ['*', '/', '/login', '/register', '/services', '/login', '/service/:serviceId']],
    [
        'nonVerifiedProvider',
        ['*', '/', '/login', '/register', '/services', '/login', '/service/:serviceId', '/wait-for-verify'],
    ],
    ['admin', ['*', '/', '/admin-verify', '/admin-remove', '/login', '/services', '/service/:serviceId']],
])

// FIXME: when deploy, change all path to plural, e.g. serviceProviders
