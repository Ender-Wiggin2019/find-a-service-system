import React from 'react'
import { ServiceStatus } from '~/services/types/request'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import InfoIcon from '@mui/icons-material/Info'

type StatusButtonProps = {
    status: ServiceStatus
    onClick: () => void
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onClick }) => {
    const statusText = status.toLowerCase()

    if (statusText === ServiceStatus.ACCEPTED.toLowerCase()) {
        return (
            <Button variant='contained' color='success' endIcon={<CheckIcon />} onClick={onClick}>
                Confirm
            </Button>
        )
    } else if (statusText === ServiceStatus.NEED_MORE_INFO.toLowerCase()) {
        return (
            <Button variant='contained' color='warning' endIcon={<InfoIcon />} onClick={onClick}>
                Need More Info
            </Button>
        )
    } else if (statusText === ServiceStatus.DECLINED.toLowerCase()) {
        return (
            <Button variant='contained' color='error' endIcon={<InfoIcon />} onClick={onClick}>
                Decline
            </Button>
        )
    }

    return null
}

export default StatusButton
