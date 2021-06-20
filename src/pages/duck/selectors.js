import { createSelector } from 'reselect';

const getBreadcrumbs = state => state.common.breadcrumbs;

export const getBreadcrumbsSelector = createSelector(
    [ getBreadcrumbs],
    breadcrumbs=>breadcrumbs);

