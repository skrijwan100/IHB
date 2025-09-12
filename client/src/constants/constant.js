export function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
        { name: 'year',   seconds: 31536000 },
        { name: 'month',  seconds: 2592000 },
        { name: 'week',   seconds: 604800 },
        { name: 'day',    seconds: 86400 },
        { name: 'hour',   seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 },
    ];

    for (const unit of units) {
        const interval = Math.floor(diffInSeconds / unit.seconds);
        if (interval >= 1) {
            return `${interval} ${unit.name}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}
