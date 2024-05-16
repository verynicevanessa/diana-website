export function formatProjectsData(data, maxItems) {
  // Filter out all video URLs
  const videoProjects = data.filter(
    (project) => project.heroImage.mimeType === "video/mp4"
  );
  // Randomly select one video project to keep
  const randomVideoProject =
    videoProjects[Math.floor(Math.random() * videoProjects.length)];

  // Map and filter the projects
  const transformedProjects = data
    .map((project) => ({
      id: project.id,
      url: project.heroImage.url,
      mime: project.heroImage.mimeType,
    }))
    .filter((project) => project.mime !== "image/gif")
    .filter((project) => project.mime !== "video/mp4");

  // Add the randomly selected video project back
  if (randomVideoProject) {
    transformedProjects.push({
      id: randomVideoProject.id,
      url: randomVideoProject.heroImage.url,
      mime: randomVideoProject.heroImage.mimeType,
    });
  }
  
  
  return transformedProjects.slice(transformedProjects.length-maxItems);
}
