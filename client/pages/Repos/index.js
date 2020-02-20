import React, { useState, useEffect, useRef } from 'react';
import { getRepos } from '../../../api/repo';
import styles from './styles.scss';

function Repos({ data, language }) {
  const isDataLoadedFromServer = useRef(null);
  const isMounted = useRef(false);

  isDataLoadedFromServer.current = data ? true : false;

  const [repos, setRepos] = useState(isDataLoadedFromServer.current ? data.items : []);

  useEffect(() => {
    if (!isDataLoadedFromServer.current || isMounted.current) {
      (async function() {
        const data = await getRepos(language);

        setRepos(data.items);
      })();
    }
    isMounted.current = true;
  }, [language]);

  return (
    <div>
      <h4>Repos :</h4>
      <ul className={styles.repos}>
        {
          repos.map(repo => {
            return (
              <li key={repo.id}>
                <div className={styles.left}>
                  <img src={repo.owner.avatar_url}></img>
                </div>
                <div className={styles.right}>
                  <h4>{repo.name}</h4>
                  <p>{repo.description}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default Repos;