import {FC, useState} from "react";
import Sidebar from "../Sidebar";
import Header, {landlordLinks, tenantLinks} from "../Header";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {ME_QUERY} from "../../graphql/queries";

type Props = {
    children?: JSX.Element | JSX.Element[]
}
const DashboardLayout: FC<Props> = ({ children }: Props) => {
    const [showMobileOverlay, setShowMobileOverlay] = useState(false)
    const {data, loading} = useQuery(ME_QUERY)
   return  (
        <div className={'min-h-screen bg-white flex relative'}>
            <Sidebar className={'hidden md:block'}/>
            <div className={'flex-grow relative'}>
                <Header className={'hidden md:flex'}/>
                <div
                    className={'md:hidden flex justify-between items-center px-6 py-4 bg-white border-b-2 border-b-gray-300 mb-8 sticky top-0 z-50'}>
                    <p className={'text-xl font-semibold'}>E-TRACKA</p>
                    <Image onMouseOver={() => setShowMobileOverlay(true)} onMouseLeave={() => setShowMobileOverlay(false)} src={'/images/menu.png'} width={45} height={45}/>
                </div>
                {
                    showMobileOverlay ? (
                        <div className={'absolute right-0 border border-primary w-1/2 bg-white z-50'}>
                            <ul className={'py-3 text-right'}>
                                <li className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                    <Link href={data?.me?.accountType?.name === 'LANDLORD' ? '/account/dashboard' : '/account/dashboard/tenant'}>
                                        <a className={'text-primary text-sm font-semibold px-4'}>Dashboard</a>
                                    </Link>
                                </li>
                                <li className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                    <Link href={'/messages'}>
                                        <a className={'text-primary text-sm font-semibold px-4'}>Messages</a>
                                    </Link>
                                </li>
                                {
                                    data?.me?.accountType?.name === 'TENANT' ? tenantLinks.map((link: any, index:number) => (
                                        <li key={index} className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                            <Link href={link.link}>
                                                <a className={'text-primary text-sm font-semibold px-4'}>
                                                    {link.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ) ) : landlordLinks.map((link: any, index:number) => (
                                        <li key={index} className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                            <Link href={link.link}>
                                                <a className={'text-primary text-sm font-semibold px-4'}>
                                                    {link.name}
                                                </a>
                                            </Link>

                                        </li>

                                    ))
                                }

                                {/**/}
                                <li className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                    <Link href={'/property'}>
                                        <a className={'text-primary text-sm font-semibold px-4'}>Property</a>
                                    </Link>
                                </li>
                                <li className={'border-b border-b-gray-300 mb-3 pb-2'}>
                                    <Link href={'/account/setting'}>
                                        <a className={'text-primary text-sm font-semibold px-4'}>Account</a>
                                    </Link>
                                </li>
                                <li className={'border-b border-b-gray-300 mb-3 pb-2'}>

                                        <a className={'text-primary text-sm font-semibold px-4'}>Logout</a>

                                </li>
                            </ul>
                        </div>
                    ) : null
                }
                <div className={'content flex items-start px-4'}>
                    {children}
                </div>
            </div>

            {/*<div className={'absolute z-50 right-0 bottom-44'}>*/}
            {/*    <div className={'static'}>*/}
            {/*        <Image src={'/images/chat.png'} height={50} width={50} />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}


export default DashboardLayout
