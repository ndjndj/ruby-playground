import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import UpdateIcon from '@mui/icons-material/Update'
import {
    Box,
    Container,
    Typography,
    Card,
    List,
    ListItem,
    ListItemText 
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import userSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { fetcher } from '@/utils'

type ArticleProps = {
    title: string, 
    content: string,
    createdAt: string, 
    updatedAt: string, 
    user: {
        name: string
    }
}

const ArticleDetail: NextPage = () => {
    const router = useRouter() 
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/'
    const { id } = router.query

    const { data, error } = userSWR(id ? url + id : null, fetcher)
    if (error) return <Error />
    if (!data) return <Loading />

    const article: ArticleProps = camelcaseKeys(data)

    return (
        <Box
            sx={{
                backgroundColor: '#EDF2F7',
                pb: 6,
                minHeight: 'calc(100vh - 57px)'
            }}
        >
            <Box
                sx={{
                    display: { xs: 'flex', lg: 'none' },
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderTop: '0.5px solid #ACBCC7',
                    height: 56, 
                    pl: 4,
                    color: '#6E7B85'
                }}
            >
                <Box sx={{ pr: 1 }}>
                    <PersonIcon />
                </Box>
                <Box sx={{ mr: 2 }}>
                    <Typography component="p">著者:</Typography>
                </Box>
                <Typography 
                    component="p" 
                    sx={{ fontWeight: 'bold', color: 'black' }}
                >
                    {article.user.name}
                </Typography>
            </Box>
            <Container maxWidth="lg">
                
            </Container>
        </Box>
    )
}