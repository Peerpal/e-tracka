import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";

type Props = {
    children?: JSX.Element | JSX.Element[]
}

const Authy: FC<Props> = ({ children}) => {
    const router = useRouter()
    const [isAuthorized, setAuthy] = useState(false)
    useEffect(() => {
        let token;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('etr_token')
            if (token) setAuthy(true)
            else router.push('/auth/login')
        }
    }, [])

    return (
        <>
            {
                isAuthorized && children
            }
        </>
    )
}

export default  Authy
