import React from 'react'
import { ServiceStatus } from '~/services/types/request'
import { Role } from '~/services/types/user'
import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import InfoIcon from '@mui/icons-material/Info'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import CreateIcon from '@mui/icons-material/Create'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

type StatusButtonProps = {
    status: ServiceStatus
    role: Role
    onClick: () => void
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onClick, role = 'serviceProvider' }) => {
    const statusText = status.toLowerCase()

    if (statusText === ServiceStatus.REQUESTED.toLowerCase()) {
        return (
            <Button variant='contained' color='warning' endIcon={<HourglassBottomIcon />} onClick={() => {}}>
                Waiting for Confirmation
            </Button>
        )
    } else if (statusText === ServiceStatus.ACCEPTED.toLowerCase()) {
        return (
            <Button variant='contained' color='success' endIcon={<CheckIcon />} onClick={onClick}>
                {role === 'serviceProvider' ? 'Confirm' : 'Waiting for Confirmation'}
            </Button>
        )
    } else if (statusText === ServiceStatus.NEED_MORE_INFO.toLowerCase()) {
        return (
            <Button variant='contained' color='warning' endIcon={<InfoIcon />} onClick={onClick}>
                {role === 'serviceProvider' ? 'Need More Info' : 'Add More Info'}
            </Button>
        )
    } else if (statusText === ServiceStatus.DECLINED.toLowerCase()) {
        return (
            <Button variant='contained' color='error' endIcon={<HighlightOffIcon />} onClick={onClick}>
                {role === 'serviceProvider' ? 'Decline' : 'Withdraw'}
            </Button>
        )
    } else if (statusText === ServiceStatus.COMPLETED.toLowerCase()) {
        return (
            <Button
                variant='contained'
                color='success'
                endIcon={role === 'serviceProvider' ? <CheckIcon /> : <CheckIcon />}
                onClick={onClick}
            >
                {role === 'serviceProvider' ? 'Complete' : 'Complete'}
            </Button>
        )
    }

    return null
}

export default StatusButton
