import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import {Formik} from "formik";
import {useMutation} from "@apollo/client";
import {SEND_NOTIFICATION} from "../../../graphql/mutations";
import {toast} from "react-toastify";
import {useRouter} from "next/router";


const NotifyTenant: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [sendNotification, {loading}] = useMutation(SEND_NOTIFICATION)

    return (
        <DashboardLayout>
            <div
                className={'w-full flex flex-col justify-center items-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-10/12'}>
                    <Formik initialValues={{
                        title: '',
                        message: ''
                    }} onSubmit={(values) => {
                        sendNotification({
                            variables: {
                                id,
                                title: values.title,
                                message: values.message,
                            }
                        }).then(({data}) => {
                            toast.success("Message sent to Tenant")
                            values.title = ''
                            values.message = ''
                        }).catch(error => toast.error(error.message))
                    }}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                          }) => (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder={'Title'}
                                           name={'title'}
                                           onChange={handleChange}
                                           value={values.title}
                                           className={'w-full px-4 py-2 outline-none border-b rounded-t-md focus:outline-none'}/>
                                    <textarea
                                        name={'message'}
                                        value={values.message}
                                        onChange={handleChange}
                                        className={'w-full px-4 outline-none border-b rounded-b-md focus:outline-none'}
                                        placeholder={'Enter Message Here'} id="" cols={30} rows={10}></textarea>
                                    <div className={'flex justify-center items-center mt-3'}>
                                        <button
                                            disabled={loading}
                                            className={'w-1/2 px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                            {loading ? 'Sending...' : ' Send Notification'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </Formik>
                </div>

            </div>
        </DashboardLayout>
    )
}


export default NotifyTenant
