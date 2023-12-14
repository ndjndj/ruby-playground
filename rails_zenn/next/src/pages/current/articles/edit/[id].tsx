import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp'
import { LoadingButton } from '@mui/lab'
import {
    AppBar, 
    Box, 
    Card, 
    Container, 
    IconButton, 
    Switch, 
    TextField, 
    Toolbar, 
    Typography
} from '@mui/material' 
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import MarkdownText from '@/components/MarkdownText'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ArticleProps = {
    title: string 
    content: string 
    status: string
}

type ArticleFormData = {
    title: string 
    content: string
}

const CurrentArticlesEdit: NextPage = () => {
    useRequireSignedIn() 
    const router = useRouter() 
    const [user] = useUserState() 
    const [, setSnackbar] = useSnackbarState() 
    const [previewChecked, setPreviewChecked] = useState<boolean>(false)
    const [statusChecked, setStatusChecked] = useState<boolean>(false)
    const [isFetched, setIsFetched] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChangePreviewChecked = () => {
        setPreviewChecked(!previewChecked)
    }

    const handleChangeStatusChecked = () => {
        setStatusChecked(!statusChecked)
    }

    const url = process.env.NEXT_PUBLIC_API_BASE_URL 
              + '/current/articles/'
    const { id } = router.query 
    const { data, error } = useSWR(
        user.isSignedIn && id ? url + id : null, 
        fetcher
    ) 

    const article: ArticleProps = useMemo(() => {
        if (!data) {
            return {
                title: '', 
                content: '', 
                status: false
            }
        }
        return {
            title: data.title == null ? '' : data.title, 
            content: data.content == null ? '' : data.content, 
            status: data.status
        }
    }, [data])

    const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({
        defaultValues: article
    })

    useEffect(() => {
        if (data) {
            reset(article) 
            setStatusChecked(article.status == "公開中")
            setIsFetched(true)
        }
    }, [data, article, reset])

    const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
        if (data.title == "") {
            return setSnackbar({
                message: '記事の保存にはタイトルが必要です', 
                severity: 'error',
                pathname: '/current/articles/edit/[id]'
            })
        }

        if (statusChecked && data.content == '') {
            return setSnackbar({
                message: '本文なしの記事の公開はできません',
                severity: 'error',
                pathname: '/current/articles/edit/[id]'
            })
        }

        setIsLoading(true)

        const patchUrl = process.env.NEXT_PUBLIC_API_BASE_URL
                    + '/current/articles/'
                    + id 
        
        const headers = {
            'Content-Type': 'application/json', 
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid')
        }

        const status = statusChecked ? 'published' : 'draft' 

        const patchData = { ...data, status: status }

        axios({
            method: 'PATCH',
            url: patchUrl, 
            data: patchData, 
            headers: headers
        }).then(() => {
            setSnackbar({
                message: '記事を保存しました', 
                severity: 'success', 
                pathname: '/current/articles/edit/[id]'
            })
        }).catch((err: AxiosError<{ error: string }>) => {
            console.log(err.message) 
            setSnackbar({
                message: '記事の保存に失敗しました', 
                severity: 'error', 
                pathname: '/current/articles/edit/[id]'
            })
        })

        setIsLoading(false)
    }

    

}