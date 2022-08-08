import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";


const TenantSearch: NextPage = () => (
    <DashboardLayout>
        <div className={'w-full flex flex-col justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
            <div className={'w-full p-4 flex flex-col justify-center items-center'}>
                <div className={'w-1/2 mt-3 relative mb-4'}>
                    <input type="text" placeholder={'Search For Tenant Here...'}
                           className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>

                    {/*<Image className={'absolute top-1/2 left-3'} src={'/images/filter.png'} height={20} width={20}/>*/}
                </div>
                <div className={'w-1/2 mt-3 flex items-start justify-between mb-4'}>
                    <div className={'flex-grow mr-8'}>
                        <p className={'text-sm font-semibold mb-3'}>Name - Mr Sola Adebambo</p>
                        <p className={'text-sm font-semibold mb-3'}>Apartment number -  Apartment B</p>
                        <p className={'text-sm font-semibold mb-3'}>Address - 22, Coker street, Ogba.Lagos</p>
                        <p className={'text-sm font-semibold mb-3'}>Phone number - 07061683547</p>
                        <p className={'text-sm font-semibold mb-3'}>Bill description -  Rent</p>
                        <p className={'text-sm font-semibold mb-3'}>Amount due - ₦300,000</p>
                        <p className={'text-sm font-semibold mb-3'}>Duration - Dec 2021 -Nov 2022</p>
                    </div>
                    <div className={'w-1/4'}>
                        <Image src={'/images/avatar-2.png'} width={50} height={50}/>
                    </div>
                </div>

                <div className={'w-1/2 flex flex-col justify-center items-center text-white'}>
                    <button
                        className={'w-full rounded-md px-12 py-2 text-center bg-primary text-sm text-white font-semibold rounded-xl hover:bg-primary-light'}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>
)

export default TenantSearch
