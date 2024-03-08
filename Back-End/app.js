const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const UPLOADS_FOLDER = './uploads';

if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER);
}

const storage = multer.diskStorage({
    destination: UPLOADS_FOLDER,
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + file.originalname); // Generate unique filename
    }
});

const upload = multer({ storage: storage });

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
            const imageUrls = JSON.parse(data);
            // Send the parsed JSON object containing image names, URLs, and descriptions
            res.status(200).json(imageUrls);
            console.log('Image URLs sent successfully to the frontend');
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Error parsing JSON');
        }
    });
});

// Route to save image URL
app.post('/api/saveImageUrl', upload.single('image'), (req, res) => {
    const imageUrl = req.file.filename; // Get the filename of the uploaded image
    const description = req.body.description; // Get the image description from the request body
    console.log('Received image filename:', imageUrl);
    console.log('Received image description:', description);
    if (imageUrl) {
        // Generate a URL for the saved image
        const imageUrlPath = `/uploads/${imageUrl}`;
        console.log('Image URL:', imageUrlPath);

        // Read existing image URLs from JSON file
        fs.readFile('./ImageUrls.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading ImageUrls.json:', err);
                res.status(500).send('Error reading ImageUrls.json');
                return;
            }

            let imageUrls = JSON.parse(data) || []; // Parse existing image URLs or initialize as empty array
            // Add the new image URL and description to the array
            imageUrls.push({ [imageUrl]: { imageUrlPath, description } });

            // Write the updated JSON back to the file
            fs.writeFile('./ImageUrls.json', JSON.stringify(imageUrls, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Error writing ImageUrls.json:', err);
                    res.status(500).send('Error writing ImageUrls.json');
                    return;
                }
                console.log('Image URL saved successfully');
                res.status(200).json({ imageUrl: imageUrlPath }); // Send the image URL as response
            });
        });
    } else {
        res.status(400).send('Image file not provided');
    }
});


// Define a route to delete a specific image by its name
app.delete('/api/deleteImage/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Delete the image file from the uploads folder
    fs.unlink(`./uploads/${imageName}`, (err) => {
        if (err) {
            console.error('Error deleting image file:', err);
            res.status(500).send('Error deleting image file');
            return;
        }
        // Read the existing JSON file and remove the image URL from it
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
                    console.log('Image URL deleted successfully');
                    res.status(200).send('Image URL deleted successfully');
                });
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                res.status(500).send('Error parsing JSON');
            }
        });
    });
});

// Route to serve images
app.get('/api/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, UPLOADS_FOLDER, imageName);

    // Check if the image file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error accessing image file:', err);
            res.status(404).send('Image not found');
            return;
        }

        // Serve the image file
        res.sendFile(imagePath);
    });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
