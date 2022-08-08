import {FC} from "react";
import Link from "next/link";
import {useMutation, useQuery} from "@apollo/client";
import {GET_POST_COMMENTS} from "../../graphql/queries";
import {Formik} from "formik";
import {CREATE_COMMENT} from "../../graphql/mutations";

type Props = {
    userId: string,
    postId: string
}
const PostComments: FC<Props> = ({userId, postId}: Props) => {
    const {data, loading} = useQuery(GET_POST_COMMENTS, {
        variables: {
            postId
        }
    })

    const [createComment, {loading: creating}] = useMutation(CREATE_COMMENT)
    return (
        loading ? (<p>Loading...</p>) :
            <>
                <div>
                    {
                        !data?.comments?.length ? (
                            <p className={'w-full flex justify-center items-center text-center py-12'}>No Comments
                                Yet</p>
                        ) : (
                            data?.comments?.map((comment: any, index: number) => (
                                <div key={index} className={'pb-4 mt-3 border-b border-b-gray-200'}>
                                    <p className={'text-sm font-semibold'}>{comment?.user?.name}</p>
                                    <p className={'text-xs'}>
                                        {comment.body}
                                    </p>
                                </div>
                            ))
                        )
                    }
                </div>
                <div>
                    {data?.comments?.length ? <Link href={''}>
                        <a className={'text-xs text-gray-400 mb-4'}>Read More</a>
                    </Link> : ''}

                    <Formik initialValues={{
                        body: ''
                    }} onSubmit={(values) => {
                        createComment({
                            variables: {
                                userId,
                                postId,
                                body: values.body
                            },
                            refetchQueries: [
                                {
                                    query: GET_POST_COMMENTS,
                                    variables: {
                                        postId
                                    }
                                }
                            ]
                        }).then(_ => values.body = '')
                    }}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={'flex justify-center center my-6'}>
                                    <div className={'flex-grow mr-8'}>
                                        <input type="text" placeholder={'Add Comment'}
                                               name={'body'}
                                               onChange={handleChange}
                                               value={values.body}
                                               className={'w-full text-sm px-4 py-1 border border-solid border-orange rounded-md focus:outline-none'}/>
                                    </div>
                                    <button
                                        className={'w-1/3 rounded-md px-12 py-1 text-center bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                        Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>

                </div>
            </>
    )
}

export default PostComments
