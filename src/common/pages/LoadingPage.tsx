import { CircularProgress, Typography } from "@mui/material";

const LoadingPage = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress
                sx={{
                    width: { xs: '60px !important', sm: '80px !important' },
                    height: { xs: '60px !important', sm: '80px !important' }
                }}
            />

            <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                    marginTop: 3,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    textAlign: 'center',
                    px: 2
                }}
            >
                잠시만 기다려 주세요
            </Typography>
        </div>
    )
}

export default LoadingPage;