"use client"

export interface StoreConfig {
    storeName: string;
    email: string;
    phone: string;
    whatsappNumber: string;
    address: string;
    // 👇 NUEVO CAMPO para el enlace exacto del mapa
    googleMapsUrl?: string; 
    description: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        tiktok?: string;
        youtube?: string;
    };
    businessHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
}

export const defaultConfig: StoreConfig = {
    storeName: "Mundo Eterno",
    email: "info@mundoeterno.com",
    phone: "+591 695 07260",
    whatsappNumber: "59169507260",
    // 👇 Dirección corregida (ortografía)
    address: "Calle 15 de Junio, entre calle San Agustín y Pinos, frente a la Iglesia Fuente de la Salvación",
    // 👇 PEGA AQUÍ TU ENLACE DE MAPS REAL (el que intentaste pasarme)
    googleMapsUrl: "https://maps.app.goo.gl/8BZLzaxr7GwxjJwy6", 
    description: "Tu destino para las flores más frescas y hermosas",
    socialMedia: {
        facebook: "https://www.facebook.com/share/1Ukm3fesna/",
        instagram: "https://www.instagram.com/mundo.eterno7",
        tiktok: "https://www.tiktok.com/@mundo.eterno44?_t=8ratdENk9ZP&_r=1", 
        youtube: "https://youtube.com/@mundoeterno-tja?si=fFIRYbhtUB7ddDVI",
    },
    businessHours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Cerrado",
    },
};

export function getConfig(): StoreConfig {
    if (typeof window === 'undefined') {
        return defaultConfig;
    }

    try {
        const stored = localStorage.getItem('storeConfig');
        if (stored) {
            const parsedStored = JSON.parse(stored);
            return { 
                ...defaultConfig, 
                ...parsedStored,
                socialMedia: {
                    ...defaultConfig.socialMedia,
                    ...(parsedStored.socialMedia || {})
                }
            };
        }
    } catch (error) {
        console.error('Error loading config:', error);
    }

    return defaultConfig;
}

export function saveConfig(config: StoreConfig): void {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.setItem('storeConfig', JSON.stringify(config));
    } catch (error) {
        console.error('Error saving config:', error);
    }
}