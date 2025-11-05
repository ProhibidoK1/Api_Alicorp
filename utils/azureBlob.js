const { BlobServiceClient } = require('@azure/storage-blob');
const { Readable } = require('stream');
const csv = require('csv-parser');

const connectionString = `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${process.env.AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

async function listarArchivosCSV() {
    const iter = containerClient.listBlobsFlat({ prefix: process.env.AZURE_DIRECTORY_NAME + '/' });
    const archivos = [];
    for await (const blob of iter) {
        if (blob.name.endsWith('.csv')) {
            archivos.push(blob.name.replace(`${process.env.AZURE_DIRECTORY_NAME}/`, ''));
        }
    }
    return archivos;
}

async function leerCSV(filename) {
    const blobName = `${process.env.AZURE_DIRECTORY_NAME}/${filename}`;
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    const stream = downloadBlockBlobResponse.readableStreamBody;

    return new Promise((resolve, reject) => {
        const results = [];
        stream
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
}

module.exports = { listarArchivosCSV, leerCSV };
