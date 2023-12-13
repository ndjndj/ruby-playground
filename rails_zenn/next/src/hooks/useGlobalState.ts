import useSWR from 'swr'

export const useUserState = () => {
    type userStateType = {
        id: number 
        name: string 
        email: string 
        isSignedIn: boolean 
        isFetched: boolean
    }
}