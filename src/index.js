import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import BaseApp from './components/layout/base.jsx';
import reportWebVitals from './reportWebVitals';
import {
    /*BrowserRouter as Router,*/ Route, Switch
} from "react-router-dom";
import {
    Router
} from "react-router";
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/configureStore';
import {languageContext} from 'constants/contexts';
import i18n from "./i18n";
import {setLocale} from "yup";
import { createBrowserHistory } from "history";
import {clearAll} from "pages/duck";
import {addLanguageToUrl} from "components/standard/link";

const history = createBrowserHistory();
history.listen((location, action) => {
    store.dispatch(clearAll());
});
const push = history.push;
const replace = history.replace;
ReactDOM.render(
  <React.StrictMode>
      <ReduxProvider store={store}>
          <Router history={history} >
              <languageContext.Consumer>
                  {defaultLanguage => <Route path="/:language" >
                      {({match, location})=>{
                          let lang = defaultLanguage;
                          const loc = {...location};
                          if(match && match.params && (match.params.language==='ru' || match.params.language==='en')){
                              lang = match.params.language;
                              loc.pathname = loc.pathname.replace('/'+lang, '');
                          }
                          history.push = function(params){
                              if(params.language){
                                  if(params.language!=='en')
                                      params.pathname = '/'+params.language+params.pathname;
                                  return push(params);
                              }
                              push(addLanguageToUrl(params, lang));
                          }
                          history.replace = function(params){
                              if(params.language){
                                  if(params.language!=='en')
                                      params.pathname = '/'+params.language+params.pathname;
                                  return replace(params);
                              }
                              replace(addLanguageToUrl(params, lang));
                          }
                          const Temp = ()=>{
                              useEffect(()=>{
                                  i18n.changeLanguage(lang);

                                  //globally set validation message translations
                                  setLocale({
                                      mixed: {
                                          required: i18n.t('validate.required')
                                      },
                                      string: {
                                          min: i18n.t('validate.string.min'),
                                      },
                                  });
                              }, [])
                              return <languageContext.Provider value={lang}>
                                      <Switch location={loc}>
                                          <Route path='*'>
                                              <BaseApp />
                                          </Route>
                                      </Switch>
                              </languageContext.Provider>;
                          };
                          return <Temp/>
                      }}
                  </Route>}
              </languageContext.Consumer>
          </Router>
      </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
