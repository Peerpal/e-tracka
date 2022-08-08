import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import ListPropertyForm from "../../components/Property/ListPropertyForm";
import {useRouter} from "next/router";


const PropertyListing: NextPage = () => {
    const router = useRouter()
   return (
        <DashboardLayout>
            <div className={'w-full flex justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-1/2 p-4'}>
                    <ListPropertyForm type={'rent'} onCreated={() => {
                        router.push('/property')
                    }}/>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default PropertyListing
