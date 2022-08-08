import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import Image from "next/image";
import Link from "next/link";
import TenantsSection from "../../../components/Dashboard/TenantsSection";


const AccountDashboard: NextPage = () => {
    return (
        <DashboardLayout>
            <div className={'flex-grow'}>
                <div className={'flex flex-col items-center justify-center px-1 md:px-8'}>
                    <Link href={'/tenant/add'}>
                        <a className={'flex flex-col mb-4'}>
                            <Image src={'/images/user-add.png'} height={65} width={65}/>
                            <span className={''}>
                        Add Tenant
                    </span>
                        </a>
                    </Link>
                    <TenantsSection/>
                </div>
            </div>
            <div className={'hidden md:block w-1/4'}>
                <div className={'w-full mb-4 bg-red-600 p-24'}  style={{width: '100%', height: '100%', position: 'relative'}}>
                    <Image className={'h-72 w-full'}  src={'/images/banner.jpg'} layout={'fill'}/>
                </div>

                <div className={'p-5 bg-alt text-center rounded-xl mb-4'}>
                    <p className={'text-xl mb-3'}>
                        Have a property to list?
                    </p>
                    <Link href={'/property/list'}>
                        <a className={'text-xs text-center bg-white border border-gray-400 px-4 py-1 rounded-md mt-3'}>
                            List Property
                        </a>
                    </Link>
                </div>
                <div className={'p-5 bg-gradient-to-r from-[#CFD9DF] to-[#E2EBF0] text-center rounded-xl mb-4'}>
                    <p className={'text-xl mb-3'}>
                        Manage your Client/Tenants
                    </p>
                    <Link href={'/tenant/manage'}>
                        <a className={'text-xs text-center bg-primary border border-black px-4 py-1 rounded-md mt-3'}>
                            Manage
                        </a>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}


export default AccountDashboard
