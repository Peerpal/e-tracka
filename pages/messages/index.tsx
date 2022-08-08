import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {GET_USER_CONVERSATIONS} from "../../graphql/queries";
import {useUser} from "../../utils/store";


const Messages: NextPage = () => {
    const {user} = useUser()
    const { data, loading } = useQuery(GET_USER_CONVERSATIONS)
    return (
        <DashboardLayout>
            <div className={'w-full flex flex-col justify-center items-center py-12 md:px-8'}>
                {loading ? (<p>Loading...</p>) :
                    !data?.getUserConversations?.length ? (<p>No Data</p>)
                        : (
                            data?.getUserConversations?.map((thread: any, index: number) => (
                                <Link key={index} href={`/messages/show/${thread?.id}`}>
                                    <a className={'w-full md:w-8/12 flex justify-between border border-black rounded-xl px-4 py-2 mb-4'}>
                                        <div className={'flex-grow mr-2'}>
                                            {
                                               !thread?.messages?.length ?
                                                    (
                                                        <>
                                                                <p className={'text-xs'}>
                                                                 Conversation started with:    {
                                                                        thread?.participants?.find((p:any) => p.id !== user?.id)?.user?.name
                                                                    }
                                                                </p>
                                                            <p className={'text-sm mt-1'}>
                                                                {thread?.createdAt}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className={'text-xs'}>
                                                                {
                                                                    thread?.messages[0]?.body
                                                                }
                                                            </p>
                                                            <p className={'text-xs text-gray-400 mt-1'}>{
                                                                thread?.messages[0]?.createdAt
                                                            }</p>
                                                        </>
                                                   )
                                            }
                                        </div>
                                        <div className={'flex-shrink'}>
                                            <Image src={'/images/avatar-2.png'} width={45} height={45}/>
                                        </div>
                                    </a>
                                </Link>
                            ))
                        )}

            </div>
        </DashboardLayout>
    )
}

export default Messages
