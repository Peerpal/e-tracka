import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import Image from "next/image";
import {useMutation, useQuery} from "@apollo/client";
import {GET_CONVERSATION} from "../../../graphql/queries";
import {useRouter} from "next/router";
import {useUser} from "../../../utils/store";
import {Formik} from "formik";
import {SEND_MESSAGE} from "../../../graphql/mutations";
import {toast} from "react-toastify";
import Link from "next/link";


const ReadMessage: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const {user} = useUser()
    const {data, loading} = useQuery(GET_CONVERSATION, {
        variables: {
            id
        }
    })

    const [sendMessage, {loading: sending}] = useMutation(SEND_MESSAGE)
    return (
        <DashboardLayout>
            <div className={'w-full flex flex-col justify-center items-center py-4 md:py-12 md:px-8'}>
                <div className={'w-full md:w-8/12 flex justify-between items-start text-xs'}>
                    <Link href={'/messages'}>
                        <a className={'text-xl'}>
                            {'<'}
                        </a>
                    </Link>
                    <div>
                        <div className={'mt-2 mr-2 capitalize'}>
                            <p className={'text-sm font-semibold'}>{user?.name}</p>
                            <span>{user?.accountType?.name.toLowerCase()}</span>
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <Image src={'/images/avatar-2.png'} width={50} height={50}/>
                            <p>Online</p>
                        </div>
                    </div>
                </div>
                <div className={'w-full flex flex-col justify-between'}>
                    <div className={'w-full flex overflow-y-scroll flex-col md:m-8 p-4'}>
                        {
                            data?.getConversation?.messages?.map((message: any, index: number) => (
                                message?.user?.id === user?.id ? (
                                    <div key={index} className={'md:w-8/12 mb-4 flex justify-end items-end'}>
                                        <div
                                            className={'flex flex-row-reverse justify-end items-center bg-black rounded-md text-white text-xs font-semibold px-4 py-2'}>
                                            <div className={'mr-2'}>
                                                <Image src={'/images/avatar-2.png'} width={50} height={50}/>
                                            </div>
                                            <p>
                                                {message.body}
                                            </p>
                                        </div>
                                    </div>)
                                    : (<div key={index} className={'md:w-8/12 mb-4 flex justify-start justify-items-start'}>
                                        <div
                                            className={'flex items-center bg-[#E9F8F1] rounded-md text-black text-xs font-semibold px-4 py-2'}>
                                            <div className={'mr-2'}>
                                                <Image src={'/images/avatar-2.png'} width={50} height={50}/>
                                            </div>
                                            <p>
                                                {message.body}
                                            </p>
                                        </div>
                                    </div>)
                            ))
                        }


                    </div>
                    <div className={'flex-grow w-full flex justify-center items-center'}>
                        <Formik initialValues={{
                            body: ''
                        }} onSubmit={(values) => {
                            sendMessage({
                                variables: {
                                    userId: user?.id,
                                    threadId: id,
                                    body: values.body
                                },
                                refetchQueries: [
                                    {
                                        query: GET_CONVERSATION,
                                        variables: {
                                            id
                                        }
                                    }
                                ]
                            }).then(({data}) => {
                                if (data?.sendMessage) {
                                    values.body = ''
                                }
                            }).catch(e => toast.error(e.message))
                        }}>
                            {({
                                  values,
                                  handleChange,
                                  handleSubmit,
                                  errors,
                              }) => (
                                <>
                                    <form className={'w-full'} onSubmit={handleSubmit}>
                                        <input type="text" placeholder={'Enter message'}
                                               name={'body'}
                                               onChange={handleChange}
                                               value={values.body}
                                               className={'w-full md:w-8/12 rounded px-4 py-3 text-sm font-bold'}/>
                                    </form>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ReadMessage
