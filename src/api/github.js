export async function fetchRecentRepos(username = "arijitk-dev") {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: token ? { Authorization: `token ${token}` } : {}, // fallback to unauthenticated
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  // filter out forks / very old repos if you want
  const clean = data
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return clean;
}
