import { Box, Grid, Container } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import ArticleCard from '@/components/ArticleCard'
import { fetcher } from '@/utils'

type ArticleProps = {
  id: number 
  title: string 
  createdAt: string 
  fromToday: string 
  user: {
    name: string
  }
}