import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import {useLazyQuery} from "@apollo/client";
import {GET_TENANTS} from "../../graphql/queries";
import {useState} from "react";


const DashboardTenantHistory: NextPage = () => {
    const [term, setTerm] = useState('')
    const [getTenants, {data, loading}] = useLazyQuery(GET_TENANTS, {
        variables: {
            term
        }
    })

    const searchTenants = async (e: any) => {
        e.preventDefault()
        await getTenants()
    }
    return (
        <DashboardLayout>
            <div
                className={'w-full flex flex-col justify-center md:m-12 md:p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-full p-4 flex flex-col justify-center items-center'}>
                    <div className={'w-full md:w-1/2 mt-3 relative mb-4'}>
                        <form onSubmit={searchTenants}>
                            <input type="text" placeholder={'Search For Tenant Here...'}
                                   onChange={e => setTerm(e.target.value)}
                                   className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                        </form>

                        {/*<Image className={'absolute top-1/2 left-3'} src={'/images/filter.png'} height={20} width={20}/>*/}
                    </div>

                </div>
                {/*Tenants */}
                {
                    loading ? <p>Loading</p> : (
                        data?.searchTenants?.map((tenant: any, index: number) => (
                            <div key={index} className={'mb-4'}>
                                <div className={'flex-grow flex flex-col justify-center items-center'}>
                                    <div className={'mb-6'}>
                                        <div
                                            className={'w-[80px] h-[80px] bg-teal-400 rounded-full flex justify-center items-center'}>
                                            <div
                                                className={'w-[55px] h-[55px] bg-white rounded-full flex justify-center items-center'}>
                                                100%
                                            </div>
                                        </div>
                                        <span className={'text-sm mt-2'}>
                        Credit Score
                    </span>
                                    </div>
                                </div>
                                <div className={'w-full mb-4 pb-3 border-b border-b-4 border-b-gray-300'}>
                                    <div className={'flex justify-between items-start p-5 mb-4 rounded-xl'}>
                                        <div className={'w-2/3 px-12'}>
                                            <div className={''}>
                                                <div className={'text-2xl mb-2'}>{tenant?.name}</div>
                                                <div className={'text-xl'}>{tenant?.property?.title}</div>
                                                <div className={'text-sm'}>{tenant?.property?.addressLine1}</div>
                                                <div className={'text-sm'}>{tenant?.phone}</div>
                                            </div>
                                            <div className={'mt-2'}>
                                                <div className={'text-xs'}>Rent -₦{tenant?.rent}</div>
                                                <div className={'text-xs'}>Paid - ₦{tenant?.amountPaid}</div>
                                                <div className={'text-xs'}>Owed - ₦{tenant?.amountOwed}</div>
                                                <div className={'text-xs'}>Duration
                                                    - {tenant?.from} -{tenant?.to}  </div>
                                            </div>
                                        </div>
                                        <div className={'w-1/4'}>
                                            <Image src={tenant?.medially[0]?.fileUrl} width={100} height={100}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }

                {/*    Tenants End*/}
            </div>
        </DashboardLayout>
    )
}

export default DashboardTenantHistory
