import { Cookies } from 'react-cookie';
import { regionKeyName } from 'common/model/RegionConst';
import { sectorKeyName } from 'common/model/SectorConst';

// TODO - learn from nextJS how to store data
export const storeUserData = (userData: any): void => {
    console.log('Storing userData: ', userData);

    // store persona data
    if (userData.persona) {
        // region
        if (userData.persona.region) {
            for (var key in regionKeyName) {
                if (userData.persona.region[key]) {
                    const cookies = new Cookies();
                    cookies.set(
                        'persona.region.' + key,
                        userData.persona.region[key],
                    );
                }
            }
        }
        // sector
        if (userData.persona.sector) {
            for (var key in sectorKeyName) {
                if (userData.persona.sector[key]) {
                    const cookies = new Cookies();
                    cookies.set(
                        'persona.sector.' + key,
                        userData.persona.sector[key],
                    );
                }
            }
        }
    }
};
