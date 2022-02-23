// translation tool will translate this code into message (in local language)
type ErrorCode =
    | 'LOADBASKET_FAILED'
    | 'ADDPORTFOLIOBASKETITEMS_FAILED'
    | 'REMOVEPORTFOLIOBASKETITEMS_FAILED';

export type BasicError = {
    code: ErrorCode;
};
