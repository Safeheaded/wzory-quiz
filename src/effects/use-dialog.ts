import { WriteMode } from '../types/admin';
import { useEffect, useState } from 'react';

export const useDialog = (mode: WriteMode | undefined) => {
    const [isOpen, setIsOpem] = useState(false);

    useEffect(() => {
        if (mode !== undefined) {
            setIsOpem(true);
        } else {
            setIsOpem(false);
        }
    }, [mode]);
    return isOpen;
};
