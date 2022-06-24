# Image processing API

This project is part of the Udacity Full-Stack Javascript Nanodegree

It is an express server which is able to take images located in a folder and create a resized thumb version of it and save it on the disk. Once created a thumb version it just serves the processed image through the api endpoint.

## API Reference

### List available images which can be accessed through the endpoint

```http
  GET /api/listImages
```
#### Create thumb version of image

```http
  GET /api/images/?filename={filename}&height={height}&width={width}
```

| Parameter  | Type     | Description    |
| :--------- | :------- | :------------- |
| `filename` | `string` | **Required**.  |
| `height`   | `number` | **Required**.  |
| `width`    | `number` | **Required**.  |
