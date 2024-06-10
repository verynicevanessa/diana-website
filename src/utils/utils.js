export function formatProjectsData(data, maxItems) {
  // Step 1: Filter out GIFs
  const nonGifProjects = data.filter(
    (project) => project.heroImage.mimeType !== "image/gif"
  );

  // Step 2: Separate video and non-video projects
  const videoProjects = nonGifProjects.filter(
    (project) => project.heroImage.mimeType === "video/mp4"
  );
  const imageProjects = nonGifProjects.filter(
    (project) => project.heroImage.mimeType !== "video/mp4"
  );

  // Step 3: Randomly select one video project to keep
  const randomVideoProject =
    videoProjects[Math.floor(Math.random() * videoProjects.length)];

  // Step 4: Transform projects to include only necessary properties
  const transformedImageProjects = imageProjects.map((project) => ({
    id: project.id,
    url: project.heroImage.url,
    mime: project.heroImage.mimeType,
  }));

  // Step 5: Add the randomly selected video project back
  let transformedProjects = [];
  if (randomVideoProject) {
    transformedProjects.push({
      id: randomVideoProject.id,
      url: randomVideoProject.heroImage.url,
      mime: randomVideoProject.heroImage.mimeType,
    });
  }

  // Step 6: Add image projects until maxItems is reached
  for (let i = 0; i < transformedImageProjects.length && transformedProjects.length < maxItems; i++) {
    transformedProjects.push(transformedImageProjects[i]);
  }

  // Ensure the list has exactly maxItems
  return transformedProjects.slice(0, maxItems);
}
