import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import {Formik} from "formik";
import Select from "react-select";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {SEND_RECEIPT} from "../../../graphql/mutations";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const GenerateReceipt: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    const [receipt, setReceipt] = useState<any>({})
    const [preview, setPreview] = useState(false)
    const [sendReceipt, {loading}] = useMutation(SEND_RECEIPT)
    return (
        <DashboardLayout>
            <div className={'w-full flex justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                {
                    !preview ? (
                            <div className={'w-6/12 text-center'}>
                                <p className={'text-xl font-bold mb-6'}>Generate Receipt</p>
                                <div className={""}>
                                    <Formik
                                        initialValues={{
                                            name:'',
                                            phone: '',
                                            addressLine1: '',
                                            addressLine2: '',
                                            amount: '',
                                            amountPaid: '',
                                            amountOwed: '',
                                            description: '',
                                            dueDate: '',
                                            apartment: ''
                                        }}
                                        // validationSchema={createProfileValidation}
                                        onSubmit={async (values) => {
                                            setReceipt(values)
                                            setPreview(true);
                                        }}
                                    >

                                        {({
                                              values,
                                              handleChange,
                                              handleSubmit,
                                              errors,
                                          }) => (
                                            <>
                                                <form autoComplete={'false'} onSubmit={handleSubmit}>

                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="text" placeholder={'Full Name'}
                                                            name={'name'}
                                                            onChange={handleChange}
                                                            value={values.name}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'apartment'}
                                                            type="text"
                                                            value={values.apartment}
                                                            placeholder={'Apartment'}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'addressLine1'}
                                                            type="text"
                                                            placeholder={'Address Line 1'}
                                                            value={values.addressLine1}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            onChange={handleChange}
                                                            name={'addressLine2'}
                                                            type="text"
                                                            placeholder={'Address Line 2'}
                                                            value={values.addressLine2}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="text"
                                                            onChange={handleChange}
                                                            name={'phone'}
                                                            placeholder={'Phone Number'}

                                                            value={values.phone}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>

                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="text"
                                                            name={'amount'}
                                                            onChange={handleChange}
                                                            placeholder={'Amount Due'}

                                                            value={values.amount}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="text"
                                                            name={'amountPaid'}
                                                            onChange={handleChange}
                                                            placeholder={'Amount Paid'}
                                                            value={values.amountPaid}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    {
                                                        !(parseFloat(values.amountPaid) >= parseFloat(values.amount)) ? (
                                                            <div className={'w-full mt-3'}>
                                                                <input
                                                                    type="text"
                                                                    name={'amountOwed'}
                                                                    onChange={handleChange}
                                                                    placeholder={'Outstanding Amount'}
                                                                    value={values.amountOwed}
                                                                    className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                            </div>
                                                        ) : null
                                                    }
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="text"
                                                            name={'description'}
                                                            onChange={handleChange}
                                                            placeholder={'Bill Description'}
                                                            value={values.description}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <input
                                                            type="date"
                                                            name={'dueDate'}
                                                            onChange={handleChange}
                                                            placeholder={'Due date'}
                                                            value={values.dueDate}
                                                            className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                    </div>
                                                    <div className={'w-full mt-3'}>
                                                        <button
                                                            className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                                            Generate Receipt
                                                        </button>
                                                    </div>
                                                </form>
                                            </>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                    ) : (
                        <div className={'w-10/12'}>
                            <div className={'flex flex-col justify-center items-center'}>
                                <p className={'w-1/3 bg-black rounded-md px-12 py-2 text-center text-white text-sm font-semiold'}>Receipt</p>
                            </div>
                            <p className={'flex justify-between pb-2 mt-4 mb-8 border-b border-b-2 border-b-gray-200'}>
                                Date - {receipt.dueDate}
                                <span className={'text-sm font-bold'}>Receipt No - 00001</span>
                            </p>

                            <div className={'flex flex-col justify-center items-center mb-8 capitalize'}>
                                <div>
                                    <p className={'text-sm font-semibold mb-3'}>Name - {receipt.name}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Apartment - {receipt.apartment}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Address - {receipt.addressLine1}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Phone number - {receipt.phone}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Bill description - {receipt.description}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Amount due - ₦{receipt.amount}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Amount Paid - ₦{receipt.amountPaid}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Amount Owed - ₦{receipt.amountOwed}</p>
                                    <p className={'text-sm font-semibold mb-3'}>Duration - {receipt.dueDate}</p>
                                </div>
                            </div>
                            <div className={'flex justify-center items-center'}>
                                <button
                                    onClick={() => setPreview(!preview)}
                                    className={'rounded-md px-12 py-2 mr-2 text-center bg-black text-white text-sm text-black font-semibold rounded-xl '}>
                                    Back
                                </button>
                                <button
                                    onClick={async () => {
                                        await sendReceipt({
                                            variables: {
                                                input:{
                                                    id,
                                                    ...receipt
                                                }
                                            }
                                        }).then(_ => {
                                            toast.success("Receipt Sent To Tenant")
                                            router.push('/tenant/manage')
                                        }).catch(e => toast.error("Error Sending Receipt"))
                                    }}
                                    disabled={loading}
                                    className={'w-1/3 rounded-md px-12 py-2 text-center bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                    {loading? 'Sending...' : 'Send Receipt'}

                                </button>
                            </div>

                        </div>
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default GenerateReceipt
