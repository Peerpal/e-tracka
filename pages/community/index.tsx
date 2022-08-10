import {NextPage} from "next";
import DashboardLayout from "../../components/Layouts/dashboard";
import Image from "next/image";
import Link from "next/link";
import {Formik} from "formik";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_POST} from "../../graphql/mutations";
import {GET_POSTS, ME_QUERY} from "../../graphql/queries";
import {toast} from "react-toastify";
import PostComments from "../../components/Post/PostComments";


const CommunityIndex: NextPage = () => {
    const { data: user } = useQuery(ME_QUERY)
    const { data: posts, loading } = useQuery(GET_POSTS)
    const [createPost, { data: post, loading: creatingPost }] = useMutation(CREATE_POST)
    return (
        <DashboardLayout>

            <div className={'w-full py-12 md:px-8'}>
                <div className={'w-full mb-8'}>
                    <Formik initialValues={{
                        title: ''
                    }}
                            enableReinitialize={true}
                            onSubmit={(values) => {
                        createPost({
                            variables: {
                                userId: user?.me?.id,
                                title: values.title
                            },
                            refetchQueries: [
                                {
                                    query: GET_POSTS
                                }
                            ]
                        }).then(({data}) => {
                            if(data?.createPost) {
                                toast.success('Post Created successfully');
                                values.title = ''
                            }
                        }).catch(error => toast.error(error.message))
                    }}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                          }) => (

                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder={'Create Post Here'}
                                       name={'title'} onChange={handleChange} value={values.title}
                                       className={'w-full p-4 rounded bg-[#F5F5F5]'}/>
                            </form>
                        )}
                    </Formik>
                </div>
                {
                    loading ? (<p>Loading...</p>) :
                        !posts?.posts?.length ? (<p>No Data</p>)
                            : (
                                posts.posts?.map((post: any, index: number) => (
                                    <div key={index} className={'w-full bg-[#F5F5F5] p-4 rounded mb-6'}>
                                        <div className={'flex justify-between items-start mb-6'}>
                                            <div className={'flex'}>
                                                <Image src={'/images/avatar-2.png'} width={50} height={50}/>
                                                <div className={'flex flex-col items-start ml-4'}>
                                                    <p className={'block flex items-center text-sm font-bold'}>{post?.user?.name}</p>
                                                    <p className={'block flex items-center text-sm font-semibold capitalize'}>{post?.user?.accountType?.name.toLowerCase()}</p>
                                                    <p className={'block flex items-center text-xs'}>
                                                        <Image src={'/images/location.png'} width={12} height={12}/>
                                                        <span className={'ml-1'}>{post?.user?.address}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={'text-sm'}>{post.createdAt}</span>
                                        </div>
                                        <div className={'w-10/12 flex justify-center items-center'}>
                                            <div className={'w-4/5'}>
                                                <p className={'text-sm font-semibold pb-4 border-b border-b-gray-200'}>
                                                    {post.title}
                                                </p>
                                                <PostComments userId={user?.me?.id} postId={post.id}/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                }
            </div>
        </DashboardLayout>
    )
}

export default CommunityIndex
