// [START containeranalysis_create_occurrence]
// Creates and returns a new Occurrence associated with an existing Note
const createOccurence = async(
    noteProjectId = 'your-project-id', // Your GCP Project Id
    noteId = 'my-note-id', // Id of the note
    occurenceProjectId = 'your-project-id', // GCP Project Id of Occurence
    imageUrl = 'my-url.io/project/image' // Image to attach metadata to
) => {
        // Import the library and create a client
        const grafeas = require('@google-cloud/grafeas');
        const client = new grafeas.v1.GrafeasClient();
    
        // Construct request
        const formattedParent = client.projectPath(occurenceProjectId);
        const formattedNote = client.notePath(noteProjectId, noteId);

        // Attach the occurence to the associated image url
        const [occ] = await client.createOccurrence({
            parent: formattedParent,
            occurrence: {
                noteName: formattedNote,
            }
        });

};
// [END containeranalysis_create_occurrence]

const args = process.argv.slice(2);
createOccurence(...args).catch(console.error);