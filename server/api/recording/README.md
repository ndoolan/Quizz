# Recording Routes
Base URL: `/api/recording` i.e. http://localhost:3000/api/recording

## GET 
### Get recording by ID
Gets a single recording by recording id. Returns JSON of Recording table row with additional `question` and `url` keys.

#### Inputs
Route parameters: 
- `/:id`: integer

#### Outputs
```json
{
  "id": 1,
  "userId": 1,
  "questionId": 1,
  "createdAt": "2024-03-06T03:04:22.512Z",
  "objectKey": "example.mkv",
  "question": {
    "id": 1,
    "body": "So, tell me a little about yourself. What brings you to this point in your career?",
    "subject": "General"
  },
  "url": "https://storage.googleapis.com/example.mkv"
}
```

### Get recordings by user ID
Gets a single recording by recording id. Returns JSON array of Recording table rows with additional `question` and `url` keys.

If a recording entry exists in the database but is missing from cloud storage, the entry will be automatically deleted from database.

#### Inputs
Route parameters:
- `/?user={userId}` - integer user ID
- Example: `GET http://localhost:3000/api/recording/?user=1`

#### Outputs
JSON array of recording database rows with url and question keys.

```json
[
  {
    "id": 1,
    "userId": 1,
    "questionId": 1,
    "createdAt": "2024-03-06T03:04:22.512Z",
    "objectKey": "example.mkv",
    "question": {
    "id": 1,
    "body": "So, tell me a little about yourself. What brings you to this point in your career?",
    "subject": "General"
  },
  "url": "https://storage.googleapis.com/example.mkv"
  },
  {
    "id": 32,
    "userId": 1,
    "questionId": 1,
    "createdAt": "2024-03-08T03:03:50.736Z",
    "objectKey": "11709867029499.mkv",
    "question": {
      "id": 1,
      "body": "So, tell me a little about yourself. What brings you to this point in your career?",
      "subject": "General"
    },
    "url": "https://storage.googleapis.com/quizz-recordings/11709867029499.mkv?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=ryanquiz%40quizz-rizz.iam.gserviceaccount.com%2F20240308%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240308T174834Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=0479e37644011f4944007dcb57f5cb23648272f6e9ddc4efc4460b365d5508c53775c740fb6cebc9d1236dddcf2125c34a26cbc2286442d248b52caaf648c9148aee452fcba6d881182fbab985053688796ab93e1a0045b4782e9fea0ca1db5e0c2495afebf8964b7c432a273e5faf0eac1545da2d8f447f9d9577fc89290edd0a3a1b3401529751fc06a2e64a6c5790d34723da185dbbbea68c9e31211962324e28e745ded55e6dd8b11eb57e31e22daa82c0da7a3f7fa8f48b4eb904b71486ba9d268c435aef7b6a6d4e88e2d1b7c8384a00eb8232cc445dc726bb1e2de96c6ce1c1890521aeb97ff794aa0cfda107c4def08b775f03e72cbdb6d1dd387821"
  }
]
```

## DELETE 
### Delete recording by ID
Deletes a recording by recording id. Only a status code is returned.

#### Inputs
Route parameters:
- `/:id` - integer recording ID

#### Outputs
- Status code only

## PUT
### Update entire recording by ID
Updates a recording. Requires schema of recording table as request body.

#### Inputs
Route parameters:
- `/:id` - integer recording ID

Body:
Content-Type: application/json
```json
{
  "id": 24,
  "userId": 1,
  "questionId": 1,
  "objectKey": "example.mkv"
}
```