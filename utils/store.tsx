import {createContext, FC, useCallback, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DecryptData, EncryptData} from "./dataSecurity";

type Props = {
    children?: JSX.Element | JSX.Element[]
}

type AppState = {
    user: any,
    token: any
}

export interface IAppContext {
    sharedState?: AppState;
    user?: any;
    token?: any
    LogOut?: () => void;
    StoreUserDetails?: (user: any, token:any) => void;

}

const AppContext = createContext<IAppContext>({});

export const AppWrapper:FC<Props> = ({children}: Props) => {
    const router = useRouter()
    const [sharedState, setSharedState] = useState<AppState>({
        user: null,
        token: null
    })

    const LogOut = useCallback(() => {
        setSharedState({
            user: null,
            token: null
        })
        router?.push("/")
    }, [])

    const StoreUserDetails = useCallback(async (user: any, token: any) => {
        EncryptData(user, "etr");
        setSharedState({user, token})
    }, [])

    const exposed = {
        user: sharedState?.user || null,
        token: sharedState?.token || null,
        setSharedState,
        sharedState,
        LogOut,
        StoreUserDetails,
    }

    const getDetails = useCallback(() => {
        let data = DecryptData("etr")
        setSharedState({...data})
    }, [])

    useEffect(() => {
        return () => getDetails()
    }, [])

    return (
        <AppContext.Provider value={exposed}>
            {children}
        </AppContext.Provider>
    ) ;
}

export const useUser = () => useContext(AppContext)

export default AppWrapper
