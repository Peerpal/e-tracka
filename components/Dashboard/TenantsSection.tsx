import {FC} from "react";
import Image from "next/image";
import {useQuery} from "@apollo/client";
import {GET_USER_TENANTS} from "../../graphql/queries";
import Link from "next/link";


const TenantsSection: FC = () => {

    const { data } = useQuery(GET_USER_TENANTS)

    return (

            data?.getUserTenants?.map((tenant: any, index: number) => (
                <div key={index} className={'w-full flex justify-between items-start p-5 mb-4 rounded-xl bg-gradient-to-t from-[#FDDB92] to-[#D1FDFF]'}>
                    <div className={'flex-grow md:w-2/3 md:px-12 capitalize'}>
                        <div className={'pb-3 border-b border-b-4 border-b-gray-300'}>
                            <div className={'text-2xl mb-2'}>{ tenant?.name }</div>
                            <div className={'text-xl'}>{tenant?.property?.title}</div>
                            <div className={'text-sm'}>{tenant?.property?.addressLine1}</div>
                            <div className={'text-sm'}>{tenant?.phone}</div>
                        </div>
                        <div className={'mt-3'}>
                            <div className={'text-xs'}>Rent -₦{tenant?.rent}</div>
                            <div className={'text-xs'}>Paid - ₦{tenant?.amountPaid}</div>
                            <div className={'text-xs'}>Owed - ₦{tenant?.amountOwed}</div>
                            <div className={'text-xs'}>Duration - {tenant?.from} -{tenant?.to}  </div>
                        </div>
                        <Link href={`/tenant/generate-bill/${tenant.id}/`}>
                            <div className={'w-full flex justify-center md:justify-start'}>
                                <a className={'block text-center bg-white mt-4 px-3 py-2 rounded-md hover:bg-gray-100'}>Generate Receipt</a>
                            </div>
                        </Link>

                    </div>
                    <div className={'w-1/4'}>
                        <Image src={tenant?.medially[0]?.fileUrl} width={100} height={100}/>
                    </div>
                </div>

            ))


    );
}


export default TenantsSection
