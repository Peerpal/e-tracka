import {FC, useRef} from "react";
import Image from "next/image";
import {Formik} from "formik";
import {newPropertyValidation} from "../../validations";
import {useRouter} from "next/router";
import {useMutation} from "@apollo/client";
import {CREATE_PROPERTY} from "../../graphql/mutations";
import {toast} from "react-toastify";
import Select from "react-select";

type Props = {
    type: String,
    onCreated: any
}

const ListPropertyForm: FC<Props> = ({type, onCreated}: Props) => {
    const imageSelector = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const [createProperty, { loading }] = useMutation(CREATE_PROPERTY)

    const submit = async (values: any) => {
        await createProperty(
            {
                variables: {
                    input: {
                        title: values.title,
                        description: values.description,
                        addressLine1: values.addressLine1,
                        addressLine2: values.addressLine2,
                        state: values.state,
                        images: values.images,
                        type: values?.type?.value,
                        amount: values.amount,
                        toilets: values.toilets,
                        bedrooms: values.bedrooms,
                    }
                }
            }
        ).then(({data}) => {
            toast.success("You've added a property'.")

            onCreated()
        })
            .catch(error => toast.error(error.message))
    }

    return (
        <>


            <div className={"mt-2"}>
                <Formik initialValues={{
                    title: '',
                    description: '',
                    addressLine1: '',
                    addressLine2: '',
                    state: '',
                    images: '',
                    type: {},
                    amount: '',
                    toilets: '',
                    bedrooms: '',
                }}  validationSchema={newPropertyValidation}
                        onSubmit={async (values) => {

                            await submit(values)
                        }}>
                    {({
                          values,
                          handleChange,
                          setFieldValue,
                          handleSubmit,
                        errors,
                        touched
                      }) => (
                          <>
                              <div className={'w-full flex justify-end'}>
                                  <Image onClick={() => imageSelector.current && imageSelector.current.click()} src={'/images/placeholder.png'} width={50} height={50}/>
                                  <div className={'text-left text-xs ml-4'}>
                                      <span className={'block'}>Minimum of 3 photos</span>
                                      <span className={'block'}>Each pictures must not exceed 5MB</span>
                                      <span className={'block'}>supported format are “jpg”, “gif”, and “png</span>
                                  </div>
                                  {errors &&
                                      touched.images &&
                                      errors.images && (
                                          <span className={'text-sm text-red-500 mt-2'}>{errors.images}</span>
                                      )}
                              </div>
                              <form autoComplete={'false'} onSubmit={handleSubmit}>
                                  <input
                                      onChange={({target}) => {
                                          setFieldValue("images", target.files && target.files);
                                      }}
                                      type="file"
                                      name="images"
                                      ref={imageSelector}
                                      multiple={true}
                                      style={{
                                          display: 'none'
                                      }}/>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Property Name</label>
                                      <input
                                          name={'title'}
                                          value={values.title}
                                          onChange={handleChange}
                                          type="text" placeholder={'Property Name'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.title &&
                                          errors.title && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.title}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Property Description</label>
                                      <input
                                          name={'description'}
                                          value={values.description}
                                          onChange={handleChange}
                                          type="text" placeholder={'Property Description'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.description &&
                                          errors.description && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.description}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Address Line 1</label>
                                      <input
                                          name={'addressLine1'}
                                          value={values.addressLine1}
                                          onChange={handleChange}
                                          type="text" placeholder={'Property Address'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.addressLine1 &&
                                          errors.addressLine1 && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.addressLine1}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Address Line 2</label>
                                      <input
                                          name={'addressLine2'}
                                          value={values.addressLine2}
                                          onChange={handleChange}
                                          type="text" placeholder={'Property Address(Line 2)'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.addressLine2 &&
                                          errors.addressLine2 && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.addressLine2}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>State</label>
                                      <input
                                          name={'state'}
                                          value={values.state}
                                          onChange={handleChange}

                                          type="text" placeholder={'State'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.state &&
                                          errors.state && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.state}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Property Amount</label>
                                      <input
                                          name={'amount'}
                                          value={values.amount}
                                          onChange={handleChange}
                                          type="text" placeholder={'Property Amount'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.amount &&
                                          errors.amount && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.amount}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Toilets</label>
                                      <input
                                          name={'toilets'}
                                          value={values.toilets}
                                          onChange={handleChange}
                                          type="text" placeholder={'No of Toilets'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.toilets &&
                                          errors.toilets && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.toilets}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <label className={'text-gray-500 px-2 mb-2'}>Rooms</label>
                                      <input
                                          name={'bedrooms'}
                                          value={values.bedrooms}
                                          onChange={handleChange}
                                          type="text" placeholder={'No of Rooms'}
                                          className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      {errors &&
                                          touched.bedrooms &&
                                          errors.bedrooms && (
                                              <span className={'text-sm text-red-500 mt-2'}>{errors.bedrooms}</span>
                                          )}
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <div className={'w-full mt-3'}>
                                          <label className={'text-gray-500 px-2 mb-2'}>Listing Type</label>
                                          <Select

                                              onChange={(option) => {
                                                  setFieldValue('type', option)
                                              }}
                                              value={values.type}
                                              options={[{
                                                  name: "For Rent",
                                                  value: "RENT",
                                              },
                                                  {
                                                      name: "For Sale",
                                                      value: "SELL",
                                                  },
                                                  {
                                                      name: "Short Let",
                                                      value:"SHORTLET"
                                                  }
                                              ].map((p: any) => {
                                                  return {
                                                      value: p.value,
                                                      label: p.name,
                                                  }
                                              })}
                                          />

                                      </div>
                                  </div>
                                  <div className={'w-full mt-3'}>
                                      <button
                                          disabled={loading}
                                          className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}>
                                          {loading ? 'Saving...' : 'Save and continue'}
                                      </button>
                                  </div>
                              </form>
                          </>

                    )}
                </Formik>
            </div>
        </>
    )
}

export default ListPropertyForm
