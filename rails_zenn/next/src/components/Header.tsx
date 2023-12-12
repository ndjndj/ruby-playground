import { AppBar, Box, Button, Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                boxShadow: 'none',
                py: '12px'
            }}
        >
            <Container maxWidth="lg" sx={{ px: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box>
                        <Link href="/">
                            <Image 
                                src="/logo.png" 
                                width={133} 
                                height={40} 
                                alt="logo" 
                            />
                        </Link>
                    </Box>

                </Box>
            </Container>
        </AppBar>
    )
}