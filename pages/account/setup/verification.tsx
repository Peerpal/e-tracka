import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Link from "next/link";
import Image from "next/image";
import {useMutation} from "@apollo/client";
import {CREATE_USER_PROFILE_VERIFICATION} from "../../../graphql/mutations";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {profileVerificationValidation} from "../../../validations";
import {toast} from "react-toastify";
import OnboardTabs from "../../../components/onboarding/OnboardTabs";
import {useUser} from "../../../utils/store";

export interface UserProfileVerificationForm {
    type: string;
    number: string;
}
const AccountSetupVerification: NextPage = () => {
    const [addDocument, {loading}] = useMutation(CREATE_USER_PROFILE_VERIFICATION)

    const router = useRouter()

    const {user} = useUser()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserProfileVerificationForm>({
        resolver: yupResolver(profileVerificationValidation)
    });

    const onSubmit = async (data: UserProfileVerificationForm) => {

        await addDocument({
            variables: {
               type: data.type,
                number: data.number
            }
        }).then(({data}) => {
            if (data?.addDocument) {
                toast.success("Document Submitted for review")

                router.push(user?.accountType?.name === 'LANDLORD' ? '/account/dashboard' : '/account/dashboard/tenant')
            }
        }).catch(error => toast.error(error.message));
    };

  return (
      <AuthLayout>
          <div className={'flex justify-center justify-items-center py'}>
              <div className={'w-full md:w-10/12 flex flex-col justify-center'}>
                  <div>
                      <OnboardTabs currentTab={'verification'}/>
                      <div className={'w-full flex justify-center'}>
                          <div className={'w-full md:w-1/2 text-center py-4'}>
                              <h1 className={'text-2xl mb'}>Finishing up </h1>
                              <span className={'block mb-3'}>
                                  Confirmation of Identity
                              </span>
                              <Image src={'/images/placeholder.png'} width={50} height={50}/>
                              <span className={'block text-sm'}>Upload you Identity card</span>
                              <div className={"mt-2"}>
                                  <form autoComplete={'false'} onSubmit={handleSubmit(onSubmit)}>
                                      <div className={'w-full mt-3'}>
                                          <select
                                              {...register('type')}
                                              defaultValue={'null'}
                                              name="account_type" className={'w-full px-4 py-2 bg-transparent border text-gray-500 rounded-xl focus:outline-none'}>
                                              <option value={'null'} disabled selected>Select ID Type</option>
                                              <option value="landlord">National ID</option>
                                              <option value="agent">Drivers Licence</option>
                                              <option value="manager">Voters Card</option>
                                              <option value="tenant">Passport</option>
                                          </select>
                                      </div>
                                      <div className={'w-full mt-3'}>
                                          <input
                                              {...register('number')}
                                              type="text" placeholder={'Document Number'}
                                                 className={'w-full px-4 py-2 border border-solid border-orange rounded-xl focus:outline-none'}/>
                                      </div>
                                      <div className={'w-full mt-3'}>
                                          <button
                                              className={'w-full px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}
                                              disabled={loading}
                                          >
                                              {loading ? 'Please wait...' : 'Finish' }
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </AuthLayout>
  )
}
export default AccountSetupVerification
