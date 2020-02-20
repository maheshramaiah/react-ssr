import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Languages from './Languages';

function Dashboard(props) {
  const [language, setLanguage] = useState(props.data ? props.data.language : '');

  function onLanguageChange(language) {
    setLanguage(language);
    props.history.push(`/dashboard/${language}`);
  }

  return (
    <>
      <Languages language={language} setLanguage={onLanguageChange} />
      {
        props.routes.map(({ path, component: Component }) => <Route
          key={path}
          path={path}
          render={() => <Component data={props.data ? props.data.data : null} language={language} />}
        />
        )
      }
    </>
  );
}

export default Dashboard;