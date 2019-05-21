async function main(
  projectId = 'your-project-id', // Your GCP Project ID
  imageUrl = 'https://gcr.io/my-project/my-image:123' // Image to attach metadata to
) {
  // [START containeranalysis_occurrences_for_image]
  /**
   * TODO(developer): Uncomment these variables before running the sample
   */
  // const projectId = 'your-project-id', // Your GCP Project ID
  // const imageUrl = 'https://gcr.io/my-project/my-image:123' // Image to attach metadata to

  // Import the library and create a client
  const grafeas = require('@google-cloud/grafeas');
  const client = new grafeas.v1.GrafeasClient();

  const formattedParent = client.projectPath(projectId);

  // Retrieves all the Occurrences associated with a specified image
  const [occurrences] = await client.listOccurrences({
    parent: formattedParent,
    filter: `resourceUrl = "${imageUrl}"`,
  });

  if (occurrences.length) {
    console.log(`Occurrences for ${imageUrl}`);
    occurrences.forEach(occurrence => {
      console.log(`${occurrence.name}:`);
      console.log(
        `  Created: ${new Date(occurrence.createTime.seconds * 1000)}`
      );
    });
  } else {
    console.log('No occurrences found.');
  }
}
// [END containeranalysis_occurrences_for_image]

main(...process.argv.slice(2));
