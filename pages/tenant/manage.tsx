import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {GET_USER_TENANTS} from "../../graphql/queries";

const ManageTenants: NextPage = () => {
    const { data } = useQuery(GET_USER_TENANTS)
    return (

    <>
        <DashboardLayout>
            <div className={'w-full flex justify-center md:m-12 md:p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-full md:w-10/12 '}>
                    {
                        !data?.getUserTenants?.length ? (<div className={'w-full flex flex-col justify-center items-center text-center py-12'}>
                            <span>No Tenants</span>
                            <Link href={'/tenant/add'}>
                                <a className={'px-12 py-3 mt-4 bg-primary text-sm text-white font-semibold rounded-xl hover:bg-primary-light'}>Add New Tenant</a>
                            </Link>
                            </div>) :
                        data?.getUserTenants?.map((tenant: any, index: number) => (
                            <div key={index} className={'w-full flex flex-col md:flex-row md:justify-between mb-4 pb-2 border-b border-b-2 border-b-gray-200 capitalize'}>
                                <div className={'w-full md:w-1/2 flex items-start mb-3'}>
                                    <Image src={tenant?.medially[0]?.fileUrl} width={50} height={50}/>
                                    <div className={'ml-3 text-left text-sm'}>
                                        <p className={'text-xl font-semibold mb-2'}>{tenant?.name}</p>
                                        <p className={'mb-2'}>{tenant?.property?.title}</p>
                                        <p className={'mb-2'}>{tenant?.property?.addressLine1}</p>
                                        <p className={'mb-2'}>{tenant?.phone}</p>
                                    </div>
                                </div>
                                <div className={'w-full md:w-1/2 flex md:justify-end'}>
                                    <ul className={'text-sm'}>
                                        {/*<li className={'mb-2 pb-1 border-b border-b-transparent hover:border-black'}>*/}
                                        {/*    <Link href={''}>*/}
                                        {/*        <a className={'w-full  flex justify-between'}>*/}
                                        {/*            <span className={"mr-6"}>View Tenant report</span>*/}
                                        {/*            <span> {'>'} </span>*/}
                                        {/*        </a>*/}
                                        {/*    </Link>*/}
                                        {/*</li>*/}
                                        <li className={'mb-2 pb-1 border-b border-b-transparent hover:border-black'}>
                                            <Link href={`/tenant/notify/${tenant.id}`}>
                                                <a className={'w-full  flex justify-between'}>
                                                    <span className={"mr-6"}>Send Notification</span>
                                                    <span> {'>'} </span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={'mb-2 pb-1 border-b border-b-transparent hover:border-black'}>
                                            <Link href={`/tenant/bill/${tenant.id}/`}>
                                                <a className={'w-full  flex justify-between'}>
                                                    <span className={"mr-6"}>Generate Bill</span>
                                                    <span> {'>'} </span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={'mb-2 pb-1 border-b border-b-transparent hover:border-black'}>
                                            <Link href={`/tenant/receipt/${tenant?.id}`}>
                                                <a className={'w-full  flex justify-between'}>
                                                    <span className={"mr-6"}>Generate Receipt</span>
                                                    <span> {'>'} </span>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </DashboardLayout>
    </>
)}

export default ManageTenants
