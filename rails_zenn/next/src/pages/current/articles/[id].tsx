import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SettingsIcon from '@mui/icons-material/Settings'
import {
    Avatar, 
    Box, 
    Container, 
    Typography,
    Card, 
    List, 
    ListItem, 
    ListItemText, 
    Tooltip, 
    IconButton 
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { useUserState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type CurrentArticleProps = {
    title: string 
    content: string 
    createdAt: string 
    status: string
}

const CurrentArticleDetail: NextPage = () => {
    useRequireSignedIn() 
    const [user] = useUserState() 
    const router = useRouter() 
    const url = process.env.NEXT_PUBLIC_API_BASE_URL 
              + '/current/articles/'
    const { id } = router.query 

    const { data, error } = useSWR(
        user.isSignedIn && id ? url + id : null, 
        fetcher
    )

    if (error) return <Error />
    if (!data) return <Loading />

}