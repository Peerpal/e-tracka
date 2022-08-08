import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import {useMutation, useQuery} from "@apollo/client";
import {GET_PROPERTY} from "../../../graphql/queries";
import {useRouter} from "next/router";
import Link from "next/link";
import {CREATE_THREAD} from "../../../graphql/mutations";
import {useUser} from "../../../utils/store";
import {toast} from "react-toastify";


const PropertyDetail: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const {user} = useUser()
    const {data} = useQuery(GET_PROPERTY, {
        variables: {
            id
        }
    })

    const [createThread, {loading}] = useMutation(CREATE_THREAD)

    const startConversation = async () => {
        await createThread({
            variables: {
                user: user?.id,
                participant: data?.property?.user?.id,
            }
        }).then(({data}) => {
            if (data?.createConversation) {
                router.push(`/messages/show/${data?.createConversation.id}`)
            }
        }).catch(e => toast.error(e.message))
    }

    return (
        <DashboardLayout>
            <div className={'w-full flex justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-4/12 mr-5'}>
                    <div className={'mb-6'}>
                        <div className={'text-sm mb-1'}>Apartment - {data?.property?.title}</div>
                        <div className={'text-sm mb-1'}>Address - {data?.property?.addressLine1}</div>
                        <div className={'text-sm mb-1'}>Contact - {data?.property?.user?.phone}</div>
                        <div className={'text-sm mb-1'}>Rent - NGN{data?.property?.amount}/ year</div>

                    </div>
                        <button
                            onClick={startConversation}
                            disabled={loading}
                            className={'px-12 py-2 bg-primary text-sm text-black font-semibold rounded-md hover:bg-primary-light'}>
                            Message
                        </button>

                </div>
                <div className={'flex-grow'}>
                    <div className={'w-full h-72 rounded-md mb-4'}
                         style={{backgroundImage: `url(${data?.property?.medially[0]?.fileUrl})`, objectFit: "contain"}}/>
                    <div className={'flex justify-between'}>
                        {
                            data?.property?.medially?.slice(1).map((image: any, index: number) => (
                                <div key={index} className={'w-4/12 h-40 rounded-md mb-4 mr-3'}
                                     style={{backgroundImage: `url(${image?.fileUrl})`, objectFit: "contain"}}/>
                            ))
                        }

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}


export default PropertyDetail
