import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const CurrentUserFetch = () => {
    const [user, setUser] = useUserState()

    const _get = (k: string): string => {
        return localStorage.getItem(k) ?? ""
    }

    useEffect(() => {
        if (user.isFetched) {
            return 
        }

        if (localStorage.getItem('access-token')) {
            const url = process.env.NEXT_PUBLIC_API_BASE_URL 
                      + '/current/user'
            
            axios
            .get(
                url, {
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': _get('access-token'),
                    client: _get('client'),
                    uid: _get('uid')
                }
            }).then((res: AxiosResponse) => {
                setUser({
                    ...user, 
                    ...res.data, 
                    isSignedIn: true, 
                    isFetched: true
                })
            })
        }
    })
}