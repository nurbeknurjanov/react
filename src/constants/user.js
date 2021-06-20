import { UserStatus } from "api/users";

export const USER_STATUS_LABELS = {
    [UserStatus.APPROVED_USER]: 'Поттвержденный',
    [UserStatus.BANNED_USER]: 'Забанен',
    [UserStatus.ZERO_VALUE_REQUIRED]: 'Не поттвержденный',
};

export {UserStatus};