import {NextPage} from "next";
import AuthLayout from "../../../components/Layouts/Auth";
import Image from "next/image";
import OnboardTabs from "../../../components/onboarding/OnboardTabs";
import {useRef} from "react";
import {Formik} from "formik";
import {newPropertyValidation} from "../../../validations";
import {useMutation} from "@apollo/client";
import {CREATE_PROPERTY} from "../../../graphql/mutations";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import ListPropertyForm from "../../../components/Property/ListPropertyForm";


const AccountSetupProperty: NextPage = () => {

    const router = useRouter()

  return (
      <AuthLayout>
          <div className={'flex justify-center justify-items-center'}>
              <div className={'w-full md:w-10/12 flex flex-col justify-center'}>
                  <div>
                      <OnboardTabs currentTab={'property'}/>
                      <div className={'w-full flex justify-center'}>
                          <div className={'w-full md:w-1/2 text-center py-4'}>
                              <h1 className={'text-xl mb'}>Your account is almost ready</h1>
                              <span className={'block mb-3'}>
                                  Tell us about your property
                              </span>
                              <ListPropertyForm type={'Rent'} onCreated={() => router.push('/account/setup/verification')}/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </AuthLayout>
  )
}

export default AccountSetupProperty
