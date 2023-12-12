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