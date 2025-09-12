#!/bin/bash
echo "Building site..."
npm run build

echo "Deploying to server..."
rsync -avz --delete dist/ deploy@88restaurants.com:/home/deploy/eight_eight/current/public/sites/custom_template

echo "Deployment complete!"
