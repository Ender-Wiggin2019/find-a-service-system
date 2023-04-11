import { Dialog } from '@headlessui/react'
import { useRef, useState } from 'react'
import { useAuthState } from '~/utils/hooks/UserContext'
import { SignInButton } from '~/components/Button/SignInButton'
import { SignOutButton } from '~/components/Button/SignOutButton'
import { Head } from '~/components/Head/Head'

function Index() {
    const { state } = useAuthState()
    const [isOpen, setIsOpen] = useState(true)
    const completeButtonRef = useRef(null)

    return (
        <>
            <Head />
            <div className='hero min-h-screen'>
                <div className='text-center hero-content mb-10'>
                    <h1 className='mb-5 text-5xl font-bold'>Pages Preview</h1>
                </div>
                <div className='text-center hero-content mt-20'>
                    <ul>
                        <li>
                            <a href='/login'>login</a>
                        </li>
                        <li>
                            <a href='/register'>register</a>
                        </li>
                        <li>
                            <a href='/service-creator'>service-creator</a>
                        </li>
                        <li>
                            <a href='/services'>services</a>
                        </li>
                        <li>
                            <a href='/customer-home'>Customer Home</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Index
