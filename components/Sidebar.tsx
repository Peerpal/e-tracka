import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
import {useUser} from "../utils/store";
import {useQuery} from "@apollo/client";
import {ME_QUERY} from "../graphql/queries";

type Props = {
    className?: string
}
const Sidebar: FC<Props> = ({ className }: Props) => {
    const { LogOut } = useUser()
    const {data, loading} = useQuery(ME_QUERY)
    return (
        <div className={`${className} w-3/12 h-screen sticky top-0 border-r border-r-gray-200`}>
            <div className={'ml-1 px-4 pb-3 border-b border-b-2 border-b-gray-300'}>
                <div className={'logo pt-12 text-2xl'}>E-TRACKA</div>
                {
                    data ? (
                        <div className={'pt-6'}>
                            {/*<Image src={`${data && data?.me?.medially[0]?.fileUrl}`} height={50} width={50} alt={'Avatar image'}/>*/}
                        </div>
                    ) : null
                }
                <span className={'text-xl capitalize'}>
                    Welcome{ `, ${ data && (data?.me?.name?.split(' ')[0] ?? '')}`}
                </span>
            </div>
            <div className={'mt-6'}>
                <ul>
                    <li className={'px-4 py-3 mb-2 transition ease-in-out delay-150 hover:bg-gray-200 border-l border-l-4 border-l-white hover:border-l-orange-400'}>
                        <Link href={data?.me?.accountType?.name === 'LANDLORD' ? '/account/dashboard' : '/account/dashboard/tenant'}>
                            <a className={'flex'}>
                                <Image src={'/images/icons/dashboard.png'} height={25} width={25}/>
                                <span className={'mx-2'}>Dashboard</span>
                            </a>
                        </Link>
                    </li>
                    <li className={'px-4 py-3 mb-2 transition ease-in-out delay-150 hover:bg-gray-200 border-l border-l-4 border-l-white hover:border-l-orange-400'}>
                        <Link href={'/messages'}>
                            <a className={'flex'}>
                                <Image src={'/images/icons/message.png'} height={25} width={25}/>
                                <span className={'mx-2'}>Messages</span>
                            </a>
                        </Link>
                    </li>
                    <li className={'px-4 py-3 mb-2 transition ease-in-out delay-150 hover:bg-gray-200 border-l border-l-4 border-l-white hover:border-l-orange-400'}>
                        <Link href={'/property'}>
                            <a className={'flex'}>
                                <Image src={'/images/icons/house.png'} height={25} width={25}/>
                                <span className={'mx-2'}>Property</span>
                            </a>
                        </Link>
                    </li>
                    <li className={'px-4 py-3 mb-2 transition ease-in-out delay-150 hover:bg-gray-200 border-l border-l-4 border-l-white hover:border-l-orange-400'}>
                        <Link href={'/account/setting'}>
                            <a className={'flex'}>
                                <Image src={'/images/icons/setting.png'} height={25} width={25}/>
                                <span className={'mx-2'}>Accounts</span>
                            </a>
                        </Link>
                    </li>
                    <li className={'px-4 py-3 mb-2 transition ease-in-out delay-150 hover:bg-gray-200 border-l border-l-4 border-l-white hover:border-l-orange-400'}>

                            <a className={'flex'} onClick={LogOut} style={{cursor: "pointer"}}>
                                <Image src={'/images/icons/logout.png'} height={25} width={25}/>
                                <span className={'mx-2'}>Log Out</span>
                            </a>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
