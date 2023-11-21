import { useState, useEffect } from 'react';
import AppleHealthKit from 'react-native-health'

// 这是一个自定义Hook
function useHealthKit() {
    const [hasPermissions, setHasPermissions] = useState(false);
    const [steps, setSteps] = useState(0);
    const [distance, setDistance] = useState(0.00);
    const [calorie, setCalorie] = useState(0);

    // 定义权限对象
    const permissions = {
        permissions: {
            read: [
                AppleHealthKit.Constants.Permissions.Steps,
                AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
                AppleHealthKit.Constants.Permissions.ActiveEnergyBurned
            ],
        },
    };

    // 初始化AppleHealthKit
    useEffect(() => {
        AppleHealthKit.initHealthKit(permissions, (err) => {
            if (err) {
                console.log("error initializing Healthkit: ", err);
                return;
            }
            setHasPermissions(true);
        });
    }, []);

    // 获取步数和行走距离
    useEffect(() => {
        if (!hasPermissions) {
            return;
        }

        const options = {
            date: new Date().toISOString(),
            includeManuallyAdded: false, // 注意属性名称的大小写
        };

        AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
            if (err) {
                console.log("error getting distance: ", err);
                return;
            }
            setDistance(Math.floor(results.value));
        });

        AppleHealthKit.getStepCount(options, (err, results) => {
            if (err) {
                console.log("error getting steps: ", err);
                return;
            }
            setSteps(results.value);
        });

        const currentDate = new Date();
        // 设置时间为0点0分0秒
        currentDate.setHours(0, 0, 0, 0);
        const colorieOptions = {
            startDate: currentDate.toISOString(),
            endDate: new Date().toISOString()
        }
        AppleHealthKit.getActiveEnergyBurned(
            (colorieOptions),
            (err, results) => {
                if (err) {
                    console.log('err colore', err);
                    return
                }
                const totalCalories = results.reduce((total, dataPoint) => total + dataPoint.value, 0);
                setCalorie(totalCalories.toFixed(1))
            },
        )
    }, [hasPermissions]);

    // 返回状态和设置方法
    return { steps, distance, calorie };
}

export default useHealthKit;
