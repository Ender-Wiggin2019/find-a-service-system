import React from 'react'
import { Role } from '../types/user'

export const SERVICE_PROVIDER_IMAGE_PATH = 'service_provider_images/'

// Note: each time add a new collection, define a new constant here
export enum FirebasePath {
    SERVICE_PROVIDER = 'serviceProvider',
    CUSTOMER = 'customer',
    SERVICE = 'service',
    COMMENT = 'comment',
    REQUEST = 'request',
    ADMIN = 'admin',
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
    | '*'

export const AuthMap = new Map<Role, URLPath[]>([
    [
        'customer',
        ['*', '/', '/customer-home', '/services', '/service/:serviceId', '/setting', '/requestHistory', '/login'],
    ],
    [
        'serviceProvider',
        ['*', '/', '/service-creator', '/service/:serviceId', '/provider-home', '/services', '/request-list', '/login'],
    ],
    ['anonymous', ['*', '/', '/login', '/register', '/services', '/login', '/service/:serviceId']],
    ['admin', ['*', '/', '/admin-verify', '/admin-remove', '/login', '/services', '/service/:serviceId']],
])

// FIXME: when deploy, change all path to plural, e.g. serviceProviders