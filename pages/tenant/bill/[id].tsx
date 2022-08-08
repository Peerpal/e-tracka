import {NextPage} from "next";
import DashboardLayout from "../../../components/Layouts/dashboard";
import {useRouter} from "next/router";
import {useMutation, useQuery} from "@apollo/client";
import {GET_TENANT, USER_PROPERTIES_QUERY} from "../../../graphql/queries";
import {Formik} from "formik";
import {createProfileValidation} from "../../../validations";
import Select from "react-select";
import {useUser} from "../../../utils/store";
import {CREATE_INVOICE} from "../../../graphql/mutations";
import {toast} from "react-toastify";

const TenantGenerateBills: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const { user } = useUser()
    const {data: properties} = useQuery(USER_PROPERTIES_QUERY, {
        variables: {
            userId: user?.id,
        }
    })
    const {data} = useQuery(GET_TENANT, {
        variables: {
            id
        }
    })

    const [createInvoice, { loading }] = useMutation(CREATE_INVOICE)

    const submitForm = async (values: any) => {
      await createInvoice({
          variables: {
              input: {
                  name: values.name,
                  email: '',
                  dateOfBirth: `12-07-3078`,
                  // dateOfBirth: `${values.dateOfBirth}`,
                  gender: values.gender,
                  phone: values.phone,
                  address: values.address,
                  amount: values.amount,
                  description: values.description,
                  dueDate: values.dueDate,
                  property: values?.property?.value
              }
          }
      }).then(({data}) => {
          if (data?.createInvoice) {
              toast.success("Invoice has been created");
              router.push(`/tenant/invoice/${data?.createInvoice?.id}`)
          }
      }).catch(error => toast.success(error.message))
    }
    return (
        <DashboardLayout>
            <div className={'w-full flex justify-center m-12 p-8 border border-2 border-orange-100 rounded-md'}>
                <div className={'w-6/12 text-center'}>
                    <p className={'text-xl font-bold mb-6'}>Generate Bills</p>
                    <div className={""}>
                        <Formik
                            initialValues={{
                                name:'',
                                dateOfBirth: '',
                                gender: '',
                                phone: '',
                                address: '',
                                amount: '',
                                description: '',
                                dueDate: '',
                                property: ''
                            }}
                            // validationSchema={createProfileValidation}
                            onSubmit={async (values) => {
                                await submitForm(values);
                            }}
                        >

                            {({
                                  values,
                                  handleChange,
                                  setFieldValue,
                                  handleSubmit,
                                  errors,
                              }) => (
                                <>
                                    <form autoComplete={'false'} onSubmit={handleSubmit}>
                                        <div className={'w-full mt-3'}>
                                            <Select

                                                onChange={(option) => {
                                                    setFieldValue('property', option)
                                                }}
                                                value={values.property}
                                                options={properties?.properties?.map((p: any) => {
                                                    return {
                                                        value: p.id,
                                                        label: p.title,
                                                    }
                                                })}
                                            />
                                        </div>
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
                                                name={'dateOfBirth'}
                                                type="date"
                                                placeholder={'Date of Birth'}
                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                        </div>
                                        <div className={'w-full mt-3'}>
                                            <select
                                                onChange={(e) => setFieldValue('gender', e?.target?.value)}
                                                name={'gender'}
                                                className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}
                                            >
                                                {/*<option value={'null'} disabled>Gender</option>*/}
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">FeMale</option>

                                            </select>
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
                                                name={'address'}
                                                onChange={handleChange}
                                                placeholder={'Address'}

                                                   value={values.address}
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
                                                Generate Bill
                                            </button>
                                        </div>
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

export default TenantGenerateBills
