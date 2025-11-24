"use client"

import { useState, useEffect } from 'react';
import { StoreConfig, getConfig, saveConfig } from '@/lib/config';

export function useStoreConfig() {
    const [config, setConfig] = useState<StoreConfig>(getConfig());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setConfig(getConfig());
        setIsLoading(false);
    }, []);

    const updateConfig = (newConfig: StoreConfig) => {
        saveConfig(newConfig);
        setConfig(newConfig);
    };

    return { config, updateConfig, isLoading };
}
