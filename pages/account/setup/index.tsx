import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {accountTypeCreateValidation, createProfileValidation} from "../../../validations";
import {useMutation} from "@apollo/client";
import {SET_ACCOUNT_TYPE} from "../../../graphql/mutations";
import {toast} from "react-toastify";
import {useUser} from "../../../utils/store";

interface UserAccountTypeForm {
    type: string
}

const Index: NextPage = () => {
    const [setAccountType, {loading}] = useMutation(SET_ACCOUNT_TYPE)
    const router = useRouter()
    const {StoreUserDetails} = useUser()

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<UserAccountTypeForm>({
        resolver: yupResolver(accountTypeCreateValidation)
    });

    const onSubmit = async (data: UserAccountTypeForm) => {

        await setAccountType({
            variables: {
                type: data.type,
            }
        }).then(({data}) => {
            if (data?.setAccountType) {
                StoreUserDetails && StoreUserDetails(data?.setAccountType, '')

                toast.success("Your Account Type has been set")

                router.push('/account/setup/profile')
            }
        }).catch(error => toast.error(error.message));
    }


  return (
      <AuthLayout>
          <div className={'flex justify-center justify-items-center p-0 md:py-12'}>
              <div className={'w-full md:w-2/3 flex flex-col justify-center text-center'}>
                 <h1 className={'text-2xl mb-4'}>Get Started</h1>
                  <span className={'block mb-8'}>
                      Set up your account
                  </span>
                  <p className={'mb-8'}>
                      I am using E-tracka as a
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div>
                          <select
                              {...register('type')}
                              onChange={e => {
                                  setValue('type', e.target.value)
                                  console.log(e.target.value)
                              }}

                              defaultValue={'null'}

                              name="account_type" className={'w-full md:w-1/2 px-4 py-2 bg-transparent border border-solid border-orange rounded-xl focus:outline-none'}>
                              <option value={'null'} disabled>Select</option>
                              <option value="LANDLORD">Landlord</option>
                              <option value="AGENT">Real Estate Agent</option>
                              {/*<option value="manager">Real Estate Manager</option>*/}
                              <option value="TENANT">Tenant</option>
                          </select>
                      </div>
                      <div className={'w-full mt-4'}>
                          <button
                              className={'w-full md:w-1/3 px-12 py-3 bg-primary text-sm text-black font-semibold rounded-xl hover:bg-primary-light'}
                              disabled={loading}
                          >
                              {
                                  loading ? 'please wait...' : 'Get Started'
                              }
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </AuthLayout>
  )
}

export default Index
