import fetch from 'node-fetch';
import qs from 'querystring';
import url from 'url';

interface Counts { [k: string]: number; }

interface GitHubResponse {
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
}

export default function main(): Promise<Counts> {
  const username = process.env.GITHUB_USERNAME;
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const urlString = url.format({
    ...url.parse(`https://api.github.com/users/${username}`),
    query: qs.stringify({ access_token: accessToken })
  });
  return fetch(urlString, {})
    .then((response) => response.json())
    .then((json: GitHubResponse): Counts => {
      return {
        'GitHub Followers': json.followers,
        'GitHub Following': json.following,
        'GitHub Public Gists': json.public_gists,
        'GitHub Public Repos': json.public_repos
      };
    });
}
