import { createSelector } from 'reselect';
const getStatusSelector = ownProps => ownProps.status
const getUsersSelector = ownProps => ownProps.users;

export const getVisibleUsers = (users, status) => {
    if(status || status===0 || status==='0')
        return users.filter(el=>String(el.status)===status);
    return users;
}
export const getVisibleUsersSelector = createSelector(
    [ getUsersSelector , getStatusSelector],
    getVisibleUsers);


const getFilterName = ownProps => ownProps.filterName;

export const getVisibleUsersFilteredByNameSelector = createSelector(
    [ getVisibleUsersSelector, getFilterName ],
    (users, keyword) => users.filter(
        el => keyword ? el.name.toLowerCase().includes(keyword.toLowerCase()):true
    )
)