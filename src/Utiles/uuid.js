import { v4 as uuidv4 } from 'uuid';
export const getUUID = (mobileNumber) => {
    // Check if the UUID for this mobileNumber is already stored
    const storedUUID = localStorage.getItem(`uuid-${mobileNumber}`);

    if (storedUUID) {
        return storedUUID;  // Return the stored UUID
    } else {
        // If no UUID is found, generate and store a new one
        const newUUID = uuidv4();
        localStorage.setItem(`uuid-${mobileNumber}`, newUUID);
        return newUUID;
    }
};