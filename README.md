
#  Tuya Rest API Service

This project utilizes RESTful APIs to control your devices on the Tuya IoT platform.

## Installation

1. **Install Dependencies:**

   ```bash
   npm install
   ```
2. **Set Environment Variables:**

Set the following environment variables to run the project:
```
CLIENT_ID: Client ID obtained from the Tuya platform.
CLIENT_SECRET: Client secret obtained from the Tuya platform.
DEVICE_ID: Identifiers of the Tuya devices you want to control (comma-separated list).
SWITCH_COMMAND: Command code used for switching in your Tuya devices.
```


## API USAGE

#### Switch the Tuya lamb on/off

```
  GET /power
```

| Parameter | Type    | Description              |
| :-------- | :------- | :------------------------- |
| `CLIENT_ID` | `string` | **REQUIRED** |
| `CLIENT_SECRET` | `string` | **REQUIRED** |
| `DEVICE_ID` | `string` | **REQUIRED** |


## Tuya IoT services

https://iot.tuya.com/
