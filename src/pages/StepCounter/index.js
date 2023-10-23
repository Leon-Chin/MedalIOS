import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppleHealthKit from 'react-native-health'

export default function StepCounter() {
    const [hasPermissions, setHasPermissions] = useState(false)
    const [steps, setSteps] = useState()
    const permissions = {
        permissions: {
            read: [AppleHealthKit.Constants.Permissions.HeartRate, AppleHealthKit.Constants.Permissions.Steps],
            write: [AppleHealthKit.Constants.Permissions.Steps],
        },
    }
    useEffect(() => {
        AppleHealthKit.initHealthKit(permissions, err => {
            if (err) {
                console.log(err);
            }
            setHasPermissions(true)
        })
    }, [])
    useEffect(() => {
        if (!hasPermissions) {
            return;
        }
        const options = {
            date: new Date().toISOString(),
            incluedeManuallyAdded: false
        }
        AppleHealthKit.getStepCount(options, (err, results) => {
            setSteps(results.value)
        })
    }, [hasPermissions])
    return (
        <SafeAreaView>
            <Text>{steps}</Text>
        </SafeAreaView>
    )
}