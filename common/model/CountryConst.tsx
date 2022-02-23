export type CountryIso = {
    countryIsoCode: string;
    countryRegion: string;
};

export const countryIsoName: Record<string, string> = {
    // TODO: Need to support multi-language
    AU: 'Australia',
    CA: 'Canada',
    CK: 'New Zealand',
    CN: 'China',
    CR: 'Costa Rica',
    DE: 'Germany',
    FR: 'France',
    GB: 'United Kingdom',
    GR: 'Greece',
    IE: 'Ireland',
    IO: 'India',
    IR: 'Iran',
    JP: 'Japan',
    PL: 'Poland',
    SG: 'Singapore',
    US: 'United States',
};

export const countryIsoFlagIconSrc: Record<string, string> = {
    AU: '/icons/countryflag/flag_au.svg',
    CA: '/icons/countryflag/flag_ca.svg',
    CK: '/icons/countryflag/flag_ck.svg',
    CN: '/icons/countryflag/flag_cn.svg',
    CR: '/icons/countryflag/flag_cr.svg',
    DE: '/icons/countryflag/flag_de.svg',
    FR: '/icons/countryflag/flag_fr.svg',
    GB: '/icons/countryflag/flag_gb.svg',
    GR: '/icons/countryflag/flag_gr.svg',
    IE: '/icons/countryflag/flag_ie.svg',
    IO: '/icons/countryflag/flag_io.svg',
    IR: '/icons/countryflag/flag_ir.svg',
    JP: '/icons/countryflag/flag_jp.svg',
    PL: '/icons/countryflag/flag_pl.svg',
    SG: '/icons/countryflag/flag_sg.svg',
    US: '/icons/countryflag/flag_us.svg',
};
