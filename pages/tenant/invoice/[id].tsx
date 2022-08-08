import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import {useMutation, useQuery} from "@apollo/client";
import {GET_INVOICE, GET_TENANT} from "../../../graphql/queries";
import {useRouter} from "next/router";
import {SEND_INVOICE} from "../../../graphql/mutations";
import {toast} from "react-toastify";


const TenantBill: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const {data} = useQuery(GET_INVOICE, {
        variables: {
            id
        }
    })

    const [sendInvoice, {loading}] = useMutation(SEND_INVOICE)

    const sendInvoiceToUser = async () => {

        await sendInvoice({
            variables: {
                id
            }
        }).then((_) => {
            toast.success("invoice sent")
            router.push('/account/dashboard')
        }).catch(error => toast.error("error sending invoice"))
    }
    return (

        <DashboardLayout>
            <div className={'w-full flex justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-10/12'}>
                    <div className={'flex flex-col justify-center items-center'}>
                        <p className={'w-1/3 bg-black rounded-md px-12 py-2 text-center text-white text-sm font-semiold'}>Bill</p>
                    </div>
                    <p className={'text-left pb-2 mb-8 border-b border-b-2 border-b-gray-200'}>
                        Date - {data?.invoice?.dueDate}
                    </p>

                    <div className={'flex flex-col justify-center items-center mb-8 capitalize'}>
                        <div>
                            <p className={'text-sm font-semibold mb-3'}>Name - {data?.invoice?.name}</p>
                            <p className={'text-sm font-semibold mb-3'}>Apartment - {data?.invoice?.property?.title}</p>
                            <p className={'text-sm font-semibold mb-3'}>Address - {data?.invoice?.property?.addressLine1}</p>
                            <p className={'text-sm font-semibold mb-3'}>Phone number - {data?.invoice?.phone}</p>
                            <p className={'text-sm font-semibold mb-3'}>Bill description - {data?.invoice?.description}</p>
                            <p className={'text-sm font-semibold mb-3'}>Amount due - ₦{data?.invoice?.amount}</p>
                            <p className={'text-sm font-semibold mb-3'}>Duration - {data?.invoice?.dueDate}</p>
                        </div>
                    </div>
                    <div className={'flex flex-col justify-center items-center'}>
                        <button
                            onClick={sendInvoiceToUser}
                            className={'w-1/3 rounded-md px-12 py-2 text-center bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                            Send Bill
                        </button>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default TenantBill
