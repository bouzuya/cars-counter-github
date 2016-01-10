import * as url from 'url';
import fetch from 'node-fetch';

type Callback = (error: Error, counts?: any) => void;
type GitHubResponse = {
  followers: string;
  following: string;
  public_repos: string;
  public_gists: string;
};

export default function main(callback: Callback): void {
  const username = process.env.GITHUB_USERNAME;
  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const urlObj = url.parse(`https://api.github.com/users/${username}`);
  urlObj.query = { access_token: accessToken };
  const urlString = url.format(urlObj);
  fetch(urlString, {})
  .then(response => response.json())
  .then((json: GitHubResponse) => {
    return {
      'GitHub Followers': json.followers,
      'GitHub Following': json.following,
      'GitHub Public Repos': json.public_repos,
      'GitHub Public Gists': json.public_gists
    };
  })
  .then((counts: any) => callback(null, counts), callback);
}
