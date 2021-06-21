import { UserStatus } from "api/users";

export const USER_STATUS_LABELS = {
    [UserStatus.APPROVED_USER]: 'Approved',
    [UserStatus.BANNED_USER]: 'Banned',
    [UserStatus.ZERO_VALUE_REQUIRED]: 'Not Approved',
};

export {UserStatus};