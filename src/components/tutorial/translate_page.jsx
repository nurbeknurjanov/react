import { withNamespaces } from 'react-i18next';
import React from 'react';
import { Trans } from 'react-i18next';

let TranslatePage = ({t})=>{

    return <div>

        <h1>{t('user.create')}</h1>
        <h1>{t('amount_of_bananas', {count: 5})}</h1>
        <h1>{t('hello', {user:{name: 'Nurbek'}})}</h1>

        <div dangerouslySetInnerHTML={{__html: t('textWithHtml', {myImg: '<img />', name:'Nurbek'})}} />

        <h1>{t('user create')}</h1>


        <br/>
        <br/>
        <br/>
        <Trans i18nKey={'what'}>
            no matter
            <strong>no matter</strong> <strong>no matter</strong>
        </Trans>
        <br/>
        <Trans>
            Hi
            my<b>baby</b>
        </Trans>
    </div>
}

TranslatePage = withNamespaces()(TranslatePage);

export default TranslatePage;