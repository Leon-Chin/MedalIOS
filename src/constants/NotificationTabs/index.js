const NotificationTabs = (formatMessage) => [
    {
        id: 1,
        name: "SystemNotifications",
        value: formatMessage({ id: 'app.news.tab.system' })
    },
    {
        id: 2,
        name: "Messages",
        value: formatMessage({ id: 'app.news.tab.pm' })
    },
    {
        id: 3,
        name: "Todos",
        value: formatMessage({ id: 'app.news.tab.todos' })
    },
]

export default NotificationTabs