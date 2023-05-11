import { Dialog } from '@headlessui/react'
import { useRef, useState } from 'react'
import { useAuthState } from '~/utils/hooks/UserContext'
import { Head } from '~/components/Head/Head'
import ServicePage from "~/pages/ServicePage/ServiceListPage/ServicePage";

function Index() {
    const { state } = useAuthState()
    const [isOpen, setIsOpen] = useState(true)
    const completeButtonRef = useRef(null)

    return (
        <>
            <Head />
            <div className='w-full py-20 sm:w-3/4 md:w-w-4/5 lg:w-w-3/4 xl:w-3/4 2xl:w-3/4 mx-auto flex items-center justify-center'>

            <section className="">
                    <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="place-self-center mr-auto lg:col-span-7">
                            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">One-Stop Solution for Everyday Needs</h1>
                            <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Life's Complicated. We Make It Easier. Find a Service Today</p>
                            <a href="/login"
                               className="inline-flex justify-center text-12 items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-button primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Get started
                            </a>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src="src/assets/landing.png"
                                 alt="mockup" />
                        </div>
                    </div>
                </section>
            </div>
            <ServicePage/>
        </>
    )
}

export default Index
