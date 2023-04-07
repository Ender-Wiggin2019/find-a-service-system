import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export function formatTime(date: Date, threshold = 24 * 60 * 60 * 1000) {
    const now = new Date()
    const timeAgo = new TimeAgo('en-GB')
    const timeDifference = now.getTime() - date.getTime()

    if (timeDifference < threshold) {
        return timeAgo.format(date, 'twitter')
    } else {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthNames[date.getMonth()]
        const day = date.getDate()
        const year = date.getFullYear()

        return `${month} ${day}, ${year}`
    }
}
