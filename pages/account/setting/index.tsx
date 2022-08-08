import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import Link from "next/link";
import Image from "next/image";
import {useMutation, useQuery} from "@apollo/client";
import {ME_QUERY} from "../../../graphql/queries";
import {Formik} from "formik";
import {CHANGE_AVATAR, CHANGE_PASSWORD, UPDATE_ACCOUNT} from "../../../graphql/mutations";
import {toast} from "react-toastify";
import {useUser} from "../../../utils/store";
import {useRef, useState} from "react";


const AccountSetting: NextPage = () => {
    const {StoreUserDetails} = useUser()
    const [shouldChangeProfile, setShouldShowProfile] = useState(false)
    const [changeAvatar, setChangeAvatar] = useState<any>()
    const imageSelector = useRef<HTMLInputElement>(null)
    const {data, loading} = useQuery(ME_QUERY)

    const [updateAccount, {loading: updating}] = useMutation(UPDATE_ACCOUNT, {
        refetchQueries: [
            {
                query: ME_QUERY
            }
        ]
    })

    const [changePassword, {loading: changing}] = useMutation(CHANGE_PASSWORD)
    const [updateAvatar, { loading: changingAvatar }] = useMutation(CHANGE_AVATAR)

    const submitForm = async (values: any) => {

        await updateAccount({
            variables: {
                id: data?.me?.id,
                ...values
            }
        }).then(({data}) => {
            if (data?.updateAccountInfo) {
                //
                let token;
                if (typeof window !== 'undefined') {
                    token = localStorage.getItem('etr_token')
                }
                StoreUserDetails && StoreUserDetails(data?.updateAccountInfo, token)
                toast.success("Account has been updated")
            }
        }).catch(error => toast.error(error.message))
    }

    const submitChangePasswordForm = async (values: any) => {
        await changePassword({
            variables: {
                id: data?.me?.id,
                ...values
            }
        }).then(({data}) => {
            if (data) {
                toast.success("Password successfully updated")
            }
        }).catch(error => toast.error(error.message))
    }
    return (
        <DashboardLayout>
            <div className={'w-full flex flex-col justify-center p-2 md:p-12'}>
                <div className={'w-full flex items-center'}>
                    <Link href={'/account/setup'}>
                        <a className={'border-b border-b-2 border-b-primary flex pb-1'}>
                        <span className={'ml-2'}>
                            General Setting
                        </span>
                        </a>
                    </Link>
                    {/*<Link href={'#'}>*/}
                    {/*    <a className={'flex ml-16 pb-1 hidden: md:block'}>*/}
                    {/*    <span className={'ml-2'}>*/}
                    {/*        FAQ/Terms and Conditions*/}
                    {/*    </span>*/}
                    {/*    </a>*/}
                    {/*</Link>*/}
                </div>
                <div className={'w-full flex justify-between pb-8'}>
                    <div className={'w-full flex flex-col justify-center items-center mt-8'}>
                        <div className={'w-full flex items-center mb-4'}>
                            {
                                data ? (
                                    <div className={'mr-4'}>
                                        <Image src={`${data && data?.me?.medially[0]?.fileUrl}`} width={50} height={50}/>
                                    </div>
                                ) : null
                            }
                            <input onChange={({target}) => {
                                setChangeAvatar(target.files && target.files[0]);
                            }} type="file" name={'avatar'} className={'hidden'} ref={imageSelector}/>
                            <button onClick={() => {
                                setShouldShowProfile(true)
                                imageSelector.current && imageSelector.current.click();
                            }} className={'rounded-md text-xs text-center border border-gray-300 px-4 py-1 mr-4'}>
                                Change Profile Picture
                            </button>
                            {
                                shouldChangeProfile ? (
                                    <button
                                        className={'rounded-md text-xs text-center border border-gray-300 px-4 py-1 mr-4'}
                                        onClick={
                                            () => {
                                                updateAvatar({
                                                    variables: {
                                                        image: changeAvatar
                                                    },
                                                    refetchQueries: [
                                                        {
                                                            query: ME_QUERY
                                                        }
                                                    ]
                                                }).then(({data}) => {
                                                    if (data?.changeAvatar) {
                                                        toast.success("Avatar updated successfully")
                                                        setShouldShowProfile(false)
                                                    }
                                                }).catch(error => toast.error(error.message))
                                            }
                                        }
                                    >
                                        Update
                                    </button>

                                ) : null
                            }
                        </div>
                        <div className={'w-full block md:flex md:px-12'}>
                            <div className={'w-full md:w-7/12 md:mr-8'}>
                                {
                                    loading ? (<p>Please wait...</p>) : (
                                        <Formik initialValues={{
                                            name: data?.me?.name,
                                            dateOfBirth: data?.me?.dateOfBirth,
                                            phone: data?.me?.phone,
                                            address: data?.me?.address
                                        }} onSubmit={async (values) => {
                                            await submitForm(values)
                                        }}>
                                            {({
                                                  values,
                                                  handleChange,
                                                  setFieldValue,
                                                  handleSubmit,
                                              }) => (
                                                <>
                                                    <form autoComplete={'false'} onSubmit={handleSubmit}>
                                                        <div className={'w-full mt-3'}>
                                                            <label className={'text-gray-500 px-2 mb-2'}>Full Name</label>
                                                            <input
                                                                type="text" placeholder={'Full Name'}
                                                                name={'name'}
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        </div>
                                                        <div className={'w-full mt-3'}>
                                                            <label className={'text-gray-500 px-2 mb-2'}>Date of Birth</label>
                                                            <input
                                                                type="date"
                                                                placeholder={'Date of Birth'}
                                                                name={'dateOfBirth'}
                                                                value={values.dateOfBirth}
                                                                onChange={handleChange}
                                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        </div>
                                                        {/*<div className={'w-full mt-3'}>*/}
                                                        {/*    <input type="text" placeholder={'Sex'}*/}
                                                        {/*           className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>*/}
                                                        {/*</div>*/}
                                                        <div className={'w-full mt-3'}>
                                                            <label className={'text-gray-500 px-2 mb-2'}>Phone Number</label>
                                                            <input
                                                                type="text"
                                                                placeholder={'Phone Number'}
                                                                name={'phone'}
                                                                value={values.phone}
                                                                onChange={handleChange}
                                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        </div>
                                                        <div className={'w-full mt-3'}>
                                                            <label className={'text-gray-500 px-2 mb-2'}>Address</label>
                                                            <input type="text" placeholder={'Address'}
                                                                   name={'address'}
                                                                   value={values.address}
                                                                   onChange={handleChange}
                                                                   className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                                        </div>
                                                        <div className={'w-full mt-6'}>
                                                            <button
                                                                disabled={updating}
                                                                className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>Update
                                                            </button>
                                                        </div>
                                                    </form>
                                                </>
                                            )}
                                        </Formik>
                                    )
                                }
                            </div>
                            <div className={'md:flex-grow mt-12 md:mt-0'}>
                                <Formik initialValues={{
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                }} onSubmit={async (values) => {
                                    await submitChangePasswordForm(values)
                                }}>
                                    {({
                                          values,
                                          handleChange,
                                          resetForm,
                                          handleSubmit,
                                      }) => (
                                        <form autoComplete={'false'} onSubmit={handleSubmit}>
                                            <div className={'w-full mt-3'}>
                                                <input type="password" placeholder={'Old Password'}
                                                       name={'oldPassword'}
                                                       onChange={handleChange}
                                                       value={values.oldPassword}
                                                       className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                            </div>
                                            <div className={'w-full mt-3'}>
                                                <input type="password" placeholder={'New Password'}
                                                       name={'newPassword'}
                                                       onChange={handleChange}
                                                       value={values.newPassword}
                                                       className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                            </div>
                                            <div className={'w-full mt-3'}>
                                                <input type="password" placeholder={'Confirm Password'}
                                                       name={'confirmPassword'}
                                                       onChange={handleChange}
                                                       value={values.confirmPassword}
                                                       className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                            </div>
                                            <div className={'w-full mt-6'}>
                                                <button
                                                    disabled={changing}
                                                    className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>Update
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default AccountSetting
