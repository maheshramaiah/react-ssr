import { api } from './base';

export async function getRepos(language) {
  return api(`https://api.github.com/search/repositories?q=stars:%3E1+language:${language}&sort=stars&order=desc&type=Repositories`);
}