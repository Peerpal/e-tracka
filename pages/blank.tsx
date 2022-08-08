import DashboardLayout from "../components/Layouts/dashboard";
import {NextPage} from "next";
import Image from "next/image";


const Blank: NextPage = () => (
    <DashboardLayout>
        <div className={'w-full flex flex-col justify-center items-center border border-2 border-orange-100 rounded-md'}>
            <div className={'w-10/12 h-screen flex flex-col justify-center items-center'}>
                <div className={'w-2/3 text-center'}>
                    <Image src={'/images/success.png'} width={100} height={100}/>
                    <p className={'text-sm font-bold mb-6 mt-3'}>Completed</p>
                    <button
                        className={'w-1/2 px-12 py-2 bg-primary text-sm text-black font-semibold rounded-md hover:bg-primary-light'}>
                        Send Notification
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>
)


export default Blank
