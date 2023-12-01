import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// 这是一个自定义Hook
function useUserTheme() {
    const { currentUser } = useSelector(state => state.user)
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        currentUser?.preferedTheme && setTheme(currentUser.preferedTheme)
    }, [currentUser]);


    // 返回状态和设置方法
    return theme;
}

export default useUserTheme;
