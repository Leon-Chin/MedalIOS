import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';

const ElapsedTimeDisplay = ({ startTime }) => {
    const [elapsedTime, setElapsedTime] = useState('00:00:00');

    useEffect(() => {
        // 更新经过的时间
        const updateElapsedTime = () => {
            const now = new Date();
            let elapsed = now - startTime; // 毫秒数
            // 计算小时、分钟、秒
            let hours = Math.floor(elapsed / (1000 * 60 * 60));
            elapsed -= hours * 1000 * 60 * 60;
            let minutes = Math.floor(elapsed / (1000 * 60));
            elapsed -= minutes * 1000 * 60;
            let seconds = Math.floor(elapsed / 1000);
            // 补零函数
            const pad = (number) => (number < 10 ? `0${number}` : number);
            // 格式化输出并更新状态
            setElapsedTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
        };
        // 设置定时器每秒更新一次
        const intervalId = setInterval(updateElapsedTime, 1000);
        // 清除定时器
        return () => clearInterval(intervalId);
    }, [startTime]);

    return (
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>{elapsedTime}</Text>
    )
}

export default ElapsedTimeDisplay

const styles = StyleSheet.create({})