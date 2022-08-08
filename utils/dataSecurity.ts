export function EncryptData(data: any,storageName: string) {
    if(!data && storageName) return null
    try{
        if (typeof window !== "undefined") {
            const toJson = JSON?.stringify(data)
            let encode = window.btoa(toJson)
            localStorage.setItem(storageName,encode)
            return true
        }
    }catch (e) {
        return true
    }
}

export function DecryptData(storageName: string){
    if(!storageName) return null
    try{
        if (typeof window !== "undefined") {
            let key = localStorage.getItem(storageName)
            let decoded = window.atob(key as string)

            // if(!decoded.includes("@WsX"))return null
            return JSON.parse(decoded)
        }
    }catch (e) {
        return null
    }
}
