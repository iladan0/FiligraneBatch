// A helper function for creating delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// This function processes a SINGLE file (our original logic)
async function processFile(file, watermarkText) {
    // This function remains unchanged
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = `Processing: ${file.name}...`;
    const formData = new FormData();
    formData.append('files[]', file);
    formData.append('watermark', watermarkText);
    try {
        const initialResponse = await fetch('https://api.filigrane.beta.gouv.fr/api/document/files', { method: 'POST', body: formData });
        if (!initialResponse.ok) throw new Error(`Upload failed with status: ${initialResponse.statusText}`);
        const { token } = await initialResponse.json();
        if (!token) throw new Error('No token received from server.');
        statusDiv.textContent = `File ${file.name} uploaded. Waiting for processing...`;
        let isReady = false;
        let attempts = 0;
        while (!isReady && attempts < 60) {
            await sleep(1000);
            const statusResponse = await fetch(`https://api.filigrane.beta.gouv.fr/api/document/url/${token}`);
            if (statusResponse.ok) {
                const statusData = await statusResponse.json();
                if (statusData.url) { isReady = true; }
            } else if (statusResponse.status === 409) { attempts++; } else { throw new Error(`Polling failed with status: ${statusResponse.statusText}`); }
        }
        if (!isReady) throw new Error('File processing timed out after 60 seconds.');
        statusDiv.textContent = `Downloading ${file.name}...`;
        const downloadUrl = `https://api.filigrane.beta.gouv.fr/api/document/${token}`;
        const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
        const newFilename = `${originalName}_watermarked.pdf`;
        chrome.downloads.download({ url: downloadUrl, filename: newFilename });
        return true;
    } catch (error) {
        statusDiv.textContent = `Error with ${file.name}: ${error.message}`;
        console.error(`An error occurred while processing ${file.name}:`, error);
        return false;
    }
}

// *** NEW FUNCTION to process ALL files in a single batch ***
async function processAllFilesAtOnce(files, watermarkText) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = `Processing ${files.length} files as a single batch...`;
    
    const formData = new FormData();
    // Loop to add all files to the same form data
    for (const file of files) {
        formData.append('files[]', file);
    }
    formData.append('watermark', watermarkText);

    try {
        const initialResponse = await fetch('https://api.filigrane.beta.gouv.fr/api/document/files', { method: 'POST', body: formData });
        if (!initialResponse.ok) throw new Error(`Upload failed with status: ${initialResponse.statusText}`);
        const { token } = await initialResponse.json();
        if (!token) throw new Error('No token received from server.');
        statusDiv.textContent = `Batch uploaded. Waiting for merge and processing...`;
        let isReady = false;
        let attempts = 0;
        while (!isReady && attempts < 60) {
            await sleep(1000);
            const statusResponse = await fetch(`https://api.filigrane.beta.gouv.fr/api/document/url/${token}`);
            if (statusResponse.ok) {
                const statusData = await statusResponse.json();
                if (statusData.url) { isReady = true; }
            } else if (statusResponse.status === 409) { attempts++; } else { throw new Error(`Polling failed with status: ${statusResponse.statusText}`); }
        }
        if (!isReady) throw new Error('File processing timed out after 60 seconds.');
        statusDiv.textContent = `Downloading merged file...`;
        const downloadUrl = `https://api.filigrane.beta.gouv.fr/api/document/${token}`;
        const newFilename = 'merged_watermarked_document.pdf'; // A generic name for the merged file
        chrome.downloads.download({ url: downloadUrl, filename: newFilename });
        statusDiv.textContent = 'Successfully processed and downloaded merged file.';
        return true;
    } catch (error) {
        statusDiv.textContent = `Error with batch processing: ${error.message}`;
        console.error('An error occurred during batch processing:', error);
        return false;
    }
}

// Event listener for the start button - NOW WITH THE NEW LOGIC
document.getElementById('start-btn').addEventListener('click', async () => {
    const filePicker = document.getElementById('file-picker'); 
    const watermarkText = document.getElementById('watermark-text').value;
    const mergeCheckbox = document.getElementById('merge-checkbox'); // Get the checkbox
    const statusDiv = document.getElementById('status');
    const startButton = document.getElementById('start-btn');

    const files = filePicker.files;

    if (files.length === 0) {
        statusDiv.textContent = 'Please select one or more files first.';
        return;
    }
    if (!watermarkText) {
        statusDiv.textContent = 'Please enter the watermark text.';
        return;
    }

    startButton.disabled = true;

    // *** THE CORE LOGIC CHANGE IS HERE ***
    if (mergeCheckbox.checked) {
        // If checkbox is ticked, use the new batch processing function
        await processAllFilesAtOnce(files, watermarkText);
    } else {
        // Otherwise, use the original loop for separate files
        let successCount = 0;
        for (const file of files) {
            if (/\.(jpe?g|png|heic|pdf)$/i.test(file.name)) {
                const success = await processFile(file, watermarkText);
                if (success) successCount++;
                await sleep(500);
            } else {
                console.warn(`'${file.name}' was SKIPPED because its extension is not supported.`);
            }
        }
        statusDiv.textContent = `Processing complete. Successfully watermarked ${successCount} out of ${files.length} files.`;
    }

    startButton.disabled = false;
});