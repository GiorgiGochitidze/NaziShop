const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define a route to get image URLs
app.get('/api/getImageUrls', (req, res) => {
    // Read the existing JSON file
    fs.readFile('./ImageUrls.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        try {
            const urlStructure = JSON.parse(data);
            // Send the parsed JSON object containing image names and URLs
            res.status(200).json(urlStructure);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
    });
});

// Route to save image URL
app.post('/api/saveImageUrl', (req, res) => {
    const { imageName, imageUrl } = req.body;
    console.log('Received imageName:', imageName);
    console.log('Received imageUrl:', imageUrl);
    if (imageName && imageUrl) {
        // Read the existing JSON file or initialize an empty array if it doesn't exist
        fs.readFile('./ImageUrls.json', 'utf8', (err, data) => {
            let urlStructure = [];
            if (!err) {
                try {
                    urlStructure = JSON.parse(data);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    res.status(500).send('Error parsing JSON');
                    return;
                }
            }
        
            // Add the new image URL with its name to the urlStructure array
            urlStructure.push({ [imageName]: imageUrl });
        
            // Write the updated JSON back to the file with utf-8 encoding and 2-space indentation
            fs.writeFile('./ImageUrls.json', JSON.stringify(urlStructure, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).send('Error writing file');
                    return;
                }
        
                console.log('Image URL saved successfully');
                res.status(200).send('Image URL saved successfully');
            });
        });
    } else {
        res.status(400).send('Image name or URL not provided');
    }
});

// Define a route to delete an image by its name
app.delete('/api/deleteImage/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Read the existing JSON file
    fs.readFile('./ImageUrls.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        try {
            let urlStructure = JSON.parse(data);
            // Filter out the image with the provided imageName
            urlStructure = urlStructure.filter(image => {
                return Object.keys(image)[0] !== imageName;
            });
            // Write the updated JSON back to the file
            fs.writeFile('./ImageUrls.json', JSON.stringify(urlStructure, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.status(500).send('Error writing file');
                    return;
                }

                console.log('Image deleted successfully');
                res.status(200).send('Image deleted successfully');
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
    });
});


// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
