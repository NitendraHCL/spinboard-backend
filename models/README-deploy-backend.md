# spinboard-backend

Deploy to Render:
1. Push this repo to GitHub.
2. Create a new Web Service on Render -> connect repo -> root.
3. Set Start Command: `npm start`
4. Add Environment Variable on Render:
   - Key: MONGODB_URI
   - Value: your MongoDB Atlas connection string (replace <username>,<password>)
5. Deploy. The Render URL will be e.g. https://hclspinboard.onrender.com
